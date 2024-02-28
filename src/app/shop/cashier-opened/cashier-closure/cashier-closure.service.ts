import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';
import {EndPoints} from '@shared/end-points';


@Injectable({
  providedIn: 'root',
})
export class CashierClosureService {
  private static STATE = '/state';

  constructor(private httpService: HttpService) {
  }

  close(cashierClosure: CashierClosure): Observable<void> {
    return this.httpService.patch(EndPoints.CASHIERS_LAST, cashierClosure);
  }

  readState(): Observable<CashierState> {
    return this.httpService.get(EndPoints.CASHIERS_LAST + CashierClosureService.STATE);
  }

  readAllClosed(): Observable<CashierClosure[]> {
    const closures: CashierClosure[] = [
      { finalCash: 1000, finalCard: 500, comment: 'Cierre de caja 1' },
      { finalCash: 1500, finalCard: 700, comment: 'Cierre de caja 2' },
      { finalCash: 800, finalCard: 400, comment: 'Cierre de caja 3' }
    ];
    return of(closures);
  }

}
