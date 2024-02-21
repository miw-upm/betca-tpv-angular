import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Budget} from "./budgets.model";
import {BudgetsSearch} from "./budgets-search.model";

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  static SEARCH = '/search';
  private budgetList: Budget[] = [
    { reference: '123456', creationDate: new Date('2024-02-21'), shoppings: [] },
    { reference: '234567', creationDate: new Date('2024-02-22'), shoppings: [] },
    { reference: '345678', creationDate: new Date('2024-02-23'), shoppings: [] },
  ];

  constructor(private httpService: HttpService) {  }

  read(reference: string): Observable<Budget> {
    const budget = this.budgetList.find(b => b.reference === reference);
    return of(budget);

    // return this.httpService
    //   .get(EndPoints.BUDGETS + '/' + reference);
  }

  search(budgetSearch: BudgetsSearch): Observable<Budget[]> {
    return of(this.budgetList.filter(budget => budget.reference.toLowerCase().includes(budgetSearch.reference.toLowerCase())));

    // return this.httpService
    //   .paramsFrom(budgetSearch)
    //   .get(EndPoints.BUDGETS + BudgetsService.SEARCH);
  }

  searchAll(): Observable<Budget[]> {
    return of(this.budgetList.filter(budget => budget.reference.toLowerCase()));
  }
}

