import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Budget} from "../cashier-opened/shopping-cart/budgets.model";
import {BudgetsSearch} from "./budgets-search.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  static REFERENCE = '/reference';
  private budgetList: Budget[] = [
    { reference: '123456', creationDate: new Date('2024-02-21'), shoppingList: [] },
    { reference: '234567', creationDate: new Date('2024-02-22'), shoppingList: [] },
    { reference: '345678', creationDate: new Date('2024-02-23'), shoppingList: [] }
  ];

  constructor(private httpService: HttpService) {
  }

  read(reference: string): Observable<Budget> {
    const budget = this.budgetList.find(b => b.reference === reference);
    return of(budget);

    // return this.httpService
    //   .get(EndPoints.BUDGETS + '/' + reference);
  }

  search(budgetSearch: BudgetsSearch): Observable<Budget[]> {
    return of(this.budgetList.filter(budget => budget.reference.toLowerCase().includes(budgetSearch.reference.toLowerCase())));

    // return this.httpService
    //   .get(EndPoints.BUDGETS + budgetSearch.reference);
  }

  searchReference(reference: string): Observable<string[]> {
    return this.httpService
      .param('reference', reference)
      .get(EndPoints.BUDGETS + BudgetsService.REFERENCE)
      .pipe(
        map(response => response.references)
      );
  }

  searchAll(): Observable<Budget[]> {
    return of(this.budgetList.filter(budget => budget.reference.toLowerCase()));
  }
}

