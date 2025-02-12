import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {CashierLast} from './models/cashier-last.model';

@Injectable({
    providedIn: 'root',
})
export class SharedCashierService {

    constructor(private readonly httpService: HttpService) {
    }

    openCashier(): Observable<void> {
        return this.httpService.post(EndPoints.CASHIERS);
    }

    readLast(): Observable<CashierLast> {
        return this.httpService.get(EndPoints.CASHIERS_LAST);
    }

}
