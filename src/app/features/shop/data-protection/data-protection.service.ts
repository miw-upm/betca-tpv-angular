import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { RgpdFilter } from './rgpd-filter.model';
import { HttpService } from '@core/services/http.service';
import { RgpdDto } from './rgpd-dto.model';
import { EndPoints } from '@core/end-points';

@Injectable({
  providedIn: 'root',
})
export class DataProtectionService {
  rgpdListSubject = new BehaviorSubject<RgpdDto[]>([]);
  rgpdList$: Observable<RgpdDto[]> = this.rgpdListSubject.asObservable();

  constructor(private httpService: HttpService) {}

  getAllRgpd(): Observable<RgpdDto[]> {
    return this.httpService.get(EndPoints.RGPDS).pipe(
      tap((rgpds) => this.rgpdListSubject.next(rgpds)),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getAllUserWithoutRgpdSigned() {
    // TODO
  }

  read(userMobile: string): Observable<RgpdDto | undefined> {
    return this.rgpdList$.pipe(map((rgpds) => rgpds.find((r) => r.userMobile === userMobile)));
  }

  update(userMobile: string, rgpdDto: RgpdDto): Observable<void> {
    return this.httpService.put(`${EndPoints.RGPDS}/${userMobile}`, rgpdDto).pipe(
      take(1),
      tap(() => {
        this.getAllRgpd().subscribe();
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  create(rgpdDto: RgpdDto): Observable<RgpdDto> {
    return this.httpService.post(EndPoints.RGPDS, rgpdDto).pipe(
      tap(() => {
        this.getAllRgpd().subscribe();
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  createNewRgpdDtoEmpty(): RgpdDto {
    return {
      rgpdType: null,
      agreement: '',
      userMobile: '',
      userName: '',
    };
  }

  search(filter: RgpdFilter): Observable<Partial<RgpdDto>[]> {
    return this.getAllRgpd().pipe(
      map((rgpds: RgpdDto[]) =>
        rgpds
          .filter(rgpd =>
            (!filter.userMobile || rgpd.userMobile.startsWith(filter.userMobile)) &&
            (!filter.userName || rgpd.userName?.toLowerCase().startsWith(filter.userName.toLowerCase())))
          .map(({ agreement, ...rest }) => rest)
      )
    );
  }
}