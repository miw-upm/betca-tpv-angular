import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Budget, BudgetSearch, CreateBudget } from "../../models/budget";

export const BUDGET_SERVICE = new InjectionToken<IBudgetService>(
  "BUDGET_SERVICE"
);

export interface IBudgetService {
  create(budget: CreateBudget): Observable<Budget>;
  read(reference: string): Observable<Budget>;
  update(reference: string, budget: Budget): Observable<Budget>;
  delete(reference: string): Observable<void>;
  search(budgetSearch: BudgetSearch): Observable<Budget[]>;
}
