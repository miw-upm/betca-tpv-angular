import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

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
  private static SEARCH: string = '/search';

  constructor(private httpService: HttpService) {
  }

  read(reference: string): Observable<Budget> {
    return this.httpService
      .get(EndPoints.BUDGETS + '/' + reference);
  }

  search(budgetSearch: BudgetsSearch): Observable<Budget[]> {
    return this.httpService
      .param('reference', budgetSearch.reference)
      .get(EndPoints.BUDGETS + BudgetsService.SEARCH);
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
    return this.httpService
      .get(EndPoints.BUDGETS + BudgetsService.SEARCH);
  }
}

