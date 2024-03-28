import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@env';
import {User} from '@core/user.model';
import {HttpService} from '@core/http.service';
import {Role} from '@core/role.model';
import {LastLogoutUpdate, SessionRecord} from "@core/session-record.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_USER + '/users/token';
  static SESSION_RECORD_END_POINT = environment.REST_CORE + '/session_records';
  private user: User;

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(mobile: number, password: string): Observable<User> {
    return this.httpService.authBasic(mobile, password)
      .post(AuthService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken; // {token:jwt} => user.token = jwt
          this.user.mobile = jwtHelper.decodeToken(jsonToken.token).user;  // secret key is not necessary
          this.user.name = jwtHelper.decodeToken(jsonToken.token).name;
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          console.log(jsonToken);

          if (this.untilOperator()) {
            const sessionRecord: SessionRecord = {
              mobile: mobile,
              firstLogin: this.getNowFormattedDate(),
            }
            this.httpService.authBasic(mobile, password)
              .post(AuthService.SESSION_RECORD_END_POINT, sessionRecord)
              .subscribe(
                sessionRecord => console.log('Session record:', sessionRecord)
              );
          }
          return this.user;
        })
      );
  }

  logout(): void {
    const lastLogoutUpdate: LastLogoutUpdate =  {
      lastLogout: this.getNowFormattedDate()
    }
    this.httpService
      .patch(AuthService.SESSION_RECORD_END_POINT + `/${this.user.mobile}`, lastLogoutUpdate)
      .subscribe(
        lastLogout => console.log('Last logout:', lastLogout)
      );

    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(new JwtHelperService().isTokenExpired(this.user.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  untilManager(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER]);
  }

  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.OPERATOR]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }

  getMobile(): number {
    return this.user ? this.user.mobile : undefined;
  }

  getName(): string {
    return this.user ? this.user.name : '???';
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getUser(): User {
    return this.user;
  }

  getNowFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
