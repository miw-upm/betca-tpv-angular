import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';

@Injectable({providedIn: 'root'})
export class CashierClosureService {
    private static readonly STATE = '/state';

    constructor(private readonly httpService: HttpService) {
    }

    close(cashierClosure: CashierClosure): Observable<void> {
        return this.httpService.patch(EndPoints.CASHIERS_LAST, cashierClosure);
    }

    readState(): Observable<CashierState> {
        return this.httpService.get(EndPoints.CASHIERS_LAST + CashierClosureService.STATE);
    }

}
