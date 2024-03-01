import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Role} from "@core/role.model";
import {User} from "@core/user.model";
import {Rgpd} from "../shared/services/models/rgpd.model";
import {RgpdType} from "../shared/services/models/RgpdType";
import {DataProtectionSearch} from "./data-protection-search.model";

@Injectable({
  providedIn: 'root',
})
export class DataProtectionService {
  private mockRgpd: Rgpd[] = [
    {
      user: {token: 'token123', mobile: 123456789, name: 'John', role: Role.CUSTOMER},
      type: RgpdType.BASIC,
      agreement: new Uint8Array(new ArrayBuffer(8)),
    },
    {
      user: {token: 'token222', mobile: 987654321, name: 'Jessy', role: Role.CUSTOMER},
      type: RgpdType.MEDIUM,
      agreement: new Uint8Array(new ArrayBuffer(8)),
    },
  ];

  private mockUser: User[] = [
    {
      name: "Jazmin",
      token: "tokenJazmin",
      mobile: 888888888,
      role: Role.CUSTOMER
    },
    {
      name: "Lisa",
      token: "tokenLisa",
      mobile: 999999999,
      role: Role.CUSTOMER
    }
  ];


  constructor(private httpService: HttpService) {
  }

  getAllRgpd(): Observable<Rgpd[]> {
    return of(this.mockRgpd);
  }

  create(rgpd: Rgpd): Observable<Rgpd> {
    this.mockRgpd.push(rgpd);
    return of(rgpd);
  }

  read(userMobile: number): Observable<Rgpd> {
    const rgpd = this.mockRgpd.find(r => r.user.mobile === userMobile);
    return of(rgpd);
  }

  update(userMobile: number, rgpd: Rgpd): Observable<Rgpd> {
    const index = this.mockRgpd.findIndex(r => r.user.mobile===userMobile);
    if(index > -1){
      this.mockRgpd[index] = rgpd;
    }
    return of(rgpd);
  }

  delete(userMobile:number): Observable<boolean>{
    const index = this.mockRgpd.findIndex(r => r.user.mobile===userMobile);
    if(index > -1){
      this.mockRgpd.splice(index,1);
      return of(true);
    }else{
      return of(false);
    }
  }

  searchUserByMobile(userMobile: number): Observable<User> {
    if(this.mockUser.find(u => u.mobile === userMobile))
    {

    }
    if(this.mockRgpd.find(m => m.user.mobile=== userMobile)!= null){

    }
    return of(this.mockUser.find(u => u.mobile === userMobile)||(this.mockRgpd.find(m => m.user.mobile=== userMobile)?.user));
  }

  search(search : DataProtectionSearch):Observable<Rgpd[]>{
    return of(this.mockRgpd.filter(i =>
      (search.type !== null && search.type!== undefined ? i.type === search.type: true) &&
      (search.user !== null && search.user.mobile !== undefined ? i.user.mobile === search.user.mobile : true)
    ));
  }
}

