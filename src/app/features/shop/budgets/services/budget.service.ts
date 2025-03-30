import { Injectable } from "@angular/core";
import { IBudgetService } from "./interfaces/budget.interface";
import { map, Observable, of, startWith } from "rxjs";
import { Budget, BudgetSearch, CreateBudget } from "../models/budget";
import { HttpService } from "@core/services/http.service";
import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";
import { EndPoints } from "@core/end-points";

@Injectable({
  providedIn: "root",
})
export class BudgetService implements IBudgetService {
  constructor(private readonly httpService: HttpService) {}

  create(budget: CreateBudget): Observable<Budget> {
    return this.httpService
      .successful("Budget created successfully.")
      .error("Budget creation failed. Please check the values and try again.")
      .post(EndPoints.BUDGETS, budget)
      .pipe(map(this.mapBudget));
  }

  read(id: string): Observable<Budget> {
    return this.httpService
      .get(`${EndPoints.BUDGETS}/${id}`)
      .pipe(map(this.mapBudget));
  }

  update(id: string, budget: Budget): Observable<Budget> {
    return this.httpService
      .successful("Budget updated successfully.")
      .error("Budget update failed. Please check the values and try again.")
      .put(`${EndPoints.BUDGETS}/${id}`, budget);
  }

  delete(id: string): Observable<void> {
    return this.httpService
      .successful("Budget deleted successfully.")
      .error("Budget deletion failed. Please try again.")
      .delete(`${EndPoints.BUDGETS}/${id}`);
  }

  search(budgetSearch: BudgetSearch): Observable<Budget[]> {
    return this.httpService
      .paramsFrom(budgetSearch)
      .get(EndPoints.BUDGETS_SEARCH)
      .pipe(
        startWith([]),
        map((budgets: Budget[]) => budgets.map(this.mapBudget))
      );
  }

  private mapBudget(budget: Budget): Budget {
    return {
      ...budget,
      shoppingList: budget.shoppingList.map(
        (shopping) =>
          new Shopping(
            shopping.barcode,
            shopping.description,
            shopping.retailPrice,
            shopping.amount
          )
      ),
    };
  }
}
