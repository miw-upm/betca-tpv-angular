import {Injectable} from '@angular/core';
import {filter, Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {CashierState} from './cashier-state.model';
import {EndPoints} from '@shared/end-points';
import {Cashier} from "../../cashier-closure/cashier.model";
import {CashierClosure} from "./cashier-closure.model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class CashierClosureService {
  private static STATE = '/state';
  private cashiers : Cashier[] = [
    {
      "id": "1",
      "initialCash": 1000,
      "cashSales": 500,
      "cardSales": 300,
      "usedVouchers": 200,
      "deposit": 100,
      "withdrawal": 50,
      "comment": "Initial cashier",
      "lostCard": 50,
      "lostCash": 100,
      "finalCash": 1300,
      "openingDate": "2023-05-10T08:00:00",
      "closureDate": "2023-05-11T17:30:00"
    },
    {
      "id": "2",
      "initialCash": 1200,
      "cashSales": 600,
      "cardSales": 400,
      "usedVouchers": 150,
      "deposit": 200,
      "withdrawal": 100,
      "comment": "Second cashier",
      "lostCard": 50,
      "lostCash": 50,
      "finalCash": 1600,
      "openingDate": "2023-05-12T08:30:00",
      "closureDate": "2023-05-13T18:00:00"
    },
    {
      "id": "3",
      "initialCash": 1500,
      "cashSales": 700,
      "cardSales": 500,
      "usedVouchers": 100,
      "deposit": 250,
      "withdrawal": 150,
      "comment": "Third cashier",
      "lostCard": null,
      "lostCash": null,
      "finalCash": 1900,
      "openingDate": "2023-05-14T09:00:00",
      "closureDate": null
    }
  ];

  constructor(private httpService: HttpService) {
  }

  close(cashierClosure: CashierClosure): Observable<void> {
    return this.httpService.patch(EndPoints.CASHIERS_LAST, cashierClosure);
  }

  readState(): Observable<CashierState> {
    return this.httpService.get(EndPoints.CASHIERS_LAST + CashierClosureService.STATE);
  }

  readClosed(): Observable<Cashier[]> {
    return of(this.cashiers).pipe(
      map(cashiers => cashiers.filter(
        cashier => cashier.closureDate !== null
      ))
    );

  }

  readAll(): Observable<Cashier[]> {
    return of(this.cashiers);
  }

}
