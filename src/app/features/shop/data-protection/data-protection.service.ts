import { Injectable } from '@angular/core';
import { RgpdType } from '@core/models/rgpd-type.model';
import { Rgpd } from '@core/models/rgpd.model';
import { Role } from '@core/models/role.model';
import { User } from '@core/models/user.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RgpdFilter } from './rgpd-filter.model';
import { ColumnData } from './column-data.model';
import { HttpClient } from '@angular/common/http';
import { EndPoints } from '@core/end-points';
import { HttpService } from '@core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DataProtectionService {
  private mockUsers: User[] = [
    { token: 'mock-token-123', mobile: 123456789, name: 'John Doe', role: Role.CUSTOMER },
    { token: 'mock-token-456', mobile: 987654321, name: 'Jane Smith', role: Role.CUSTOMER },
  ];

  private mockRgpdList: Rgpd[] = [
    { type: RgpdType.ADVANCED, agreement: new Uint8Array([72, 101, 108, 108, 111]), user: this.mockUsers[0] },
    { type: RgpdType.BASIC, agreement: new Uint8Array([67, 111, 110, 115, 101, 110, 116]), user: this.mockUsers[1] },
  ];

  private rgpdListSubject = new BehaviorSubject<Rgpd[]>(this.mockRgpdList);
  rgpdList$: Observable<Rgpd[]> = this.rgpdListSubject.asObservable();

  constructor(private httpService: HttpService) {
  }

  getAllUserWithoutRgpdSigned(): Observable<User[]> {
    return this.rgpdList$.pipe(
      map((rgpds) => {
        const usersWithSignedRgpd = new Set(
          rgpds.filter((rgpd) => rgpd.agreement !== null && rgpd.agreement.length > 0).map((rgpd) => rgpd.user.mobile),
        );

        return this.mockUsers.filter((user) => !usersWithSignedRgpd.has(user.mobile));
      }),
    );
  }

  getFilteredRgpdList(filter: RgpdFilter): Observable<ColumnData[]> {
    return this.rgpdList$.pipe(
      map((rgpds) =>
        this.applyFilter(
          rgpds.map((rgpd) => this.mapToColumnData(rgpd)),
          filter,
        ),
      ),
    );
  }

  private applyFilter(data: ColumnData[], filter: RgpdFilter): ColumnData[] {
    const normalizedUserFilter = filter.user?.toLowerCase().trim() || '';
    const normalizedMobileFilter = filter.mobile ? filter.mobile.toString() : '';
    const normalizedTypeFilter = filter.type ? filter.type : null;

    return data.filter(
      (column) =>
        column.userName?.toLowerCase().includes(normalizedUserFilter) &&
        column.userMobile.toString().startsWith(normalizedMobileFilter) &&
        (normalizedTypeFilter === null || column.type === normalizedTypeFilter),
    );
  }

 

  read(userMobile: number): Observable<ColumnData | undefined> {
    return this.rgpdList$.pipe(
      map((rgpds) => {
        const rgpd = rgpds.find((r) => r.user.mobile === userMobile);
        if (!rgpd) return undefined;

        return {
          type: rgpd.type,
          agreement: rgpd.agreement,
          userName: rgpd.user.name,
          userMobile: rgpd.user.mobile,
        };
      }),
    );
  }

  update(rgpd: Rgpd): Observable<void> {
    return new Observable<void>((observer) => {
      const updatedList = this.rgpdListSubject.value.map((r) => (r.user.mobile === rgpd.user.mobile ? rgpd : r));

      this.rgpdListSubject.next(updatedList);

      observer.next();
      observer.complete();
    });
  }

  delete(userMobile: number): void {
    const updatedList = this.rgpdListSubject.value.filter((r) => r.user.mobile !== userMobile);
    this.rgpdListSubject.next(updatedList);
  }

  getUsers(): Observable<User[]> {
    return new BehaviorSubject<User[]>(this.mockUsers).asObservable();
  }

  getUserByMobile(userMobile: number): Observable<User | undefined> {
    return new Observable((observer) => {
      const foundUser = this.mockUsers.find((user) => user.mobile === userMobile);

      observer.next(foundUser);
      observer.complete();
    });
  }

  private mapToColumnData(rgpd: Rgpd): ColumnData {
    return {
      type: rgpd.type,
      agreement: rgpd.agreement,
      userName: rgpd.user.name,
      userMobile: rgpd.user.mobile,
    };
  }

  create(rgpd: Rgpd): Observable<Rgpd> {
    const base64Agreement = this.encodeBase64(rgpd.agreement);

    const rgpdToSend = {
      rgpdType: rgpd.type,  // Asegurar que "type" coincide con el backend
      agreement: base64Agreement,  // Enviar el acuerdo en Base64
      userMobile: rgpd.user.mobile,  // Incluir el móvil del usuario
    };

    return this.httpService.post(EndPoints.RGPDS, rgpdToSend);
  }

  private encodeBase64(buffer: Uint8Array): string {
    return btoa(String.fromCharCode(...buffer));
  }
}
