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
      .pipe(
        map((budget: Budget) => ({
          ...budget,
          shoppingList: budget.shoppingList.map(
            (shopping) =>
              new Shopping(
                shopping.barcode,
                shopping.description,
                shopping.retailPrice
              )
          ),
        }))
      );
  }

  read(reference: string): Observable<Budget> {
    return of({
      id: "0001",
      reference: "0001",
      creationDate: new Date(),
      shoppingList: [
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
      ],
    });
  }

  update(reference: string, budget: Budget): Observable<Budget> {
    return of({
      id: "0001",
      reference: "0001",
      creationDate: new Date(),
      shoppingList: [
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
      ],
    });
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
        map((budgets: Budget[]) =>
          budgets.map((budget) => ({
            ...budget,
            shoppingList: budget.shoppingList.map(
              (shopping) =>
                new Shopping(
                  shopping.barcode,
                  shopping.description,
                  shopping.retailPrice
                )
            ),
          }))
        )
      );
  }
}
