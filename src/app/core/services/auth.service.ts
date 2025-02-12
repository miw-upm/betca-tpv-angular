import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {HttpService} from '@core/services/http.service';
import {environment} from '@env';
import {User} from '@core/models/user.model';
import {Role} from '@core/models/role.model';


@Injectable({providedIn: 'root'})
export class AuthService {
    static readonly END_POINT = environment.REST_USER + '/users/token';
    private user: User;

    constructor(private readonly httpService: HttpService, private readonly router: Router) {
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
                    return this.user;
                })
            );
    }

    logout(): void {
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

}
