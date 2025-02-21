import { Injectable } from "@angular/core";
import { IBudgetService } from "./interfaces/budget.interface";
import { Observable, of } from "rxjs";
import { Budget, BudgetSearch } from "../models/budget";
import { HttpService } from "@core/services/http.service";
import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

@Injectable({
  providedIn: "root",
})
export class BudgetService implements IBudgetService {
  constructor(private readonly httpService: HttpService) {}

  create(budget: Budget): Observable<Budget> {
    return of({
      reference: "0001",
      creationDate: new Date(),
      shoppings: [
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
      ],
    });
  }

  read(reference: string): Observable<Budget> {
    return of({
      reference: "0001",
      creationDate: new Date(),
      shoppings: [
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
      ],
    });
  }

  update(reference: string, budget: Budget): Observable<Budget> {
    return of({
      reference: "0001",
      creationDate: new Date(),
      shoppings: [
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
        new Shopping("0001", "Description 1", 1),
      ],
    });
  }

  delete(reference: string): Observable<void> {
    return of(void 0);
  }

  search(budgetSearch: BudgetSearch): Observable<Budget[]> {
    return of([
      {
        reference: "0001",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0001", "Description 1", 1),
          new Shopping("0001", "Description 1", 1),
          new Shopping("0001", "Description 1", 1),
        ],
      },
      {
        reference: "0002",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0002", "Description 2", 2),
          new Shopping("0002", "Description 2", 2),
          new Shopping("0002", "Description 2", 2),
        ],
      },
      {
        reference: "0003",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0003", "Description 3", 3),
          new Shopping("0003", "Description 3", 3),
          new Shopping("0003", "Description 3", 3),
        ],
      },
      {
        reference: "0004",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0004", "Description 4", 4),
          new Shopping("0004", "Description 4", 4),
          new Shopping("0004", "Description 4", 4),
        ],
      },
      {
        reference: "0005",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0005", "Description 5", 5),
          new Shopping("0005", "Description 5", 5),
          new Shopping("0005", "Description 5", 5),
        ],
      },
      {
        reference: "0006",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0006", "Description 6", 6),
          new Shopping("0006", "Description 6", 6),
          new Shopping("0006", "Description 6", 6),
        ],
      },
      {
        reference: "0007",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0007", "Description 7", 7),
          new Shopping("0007", "Description 7", 7),
          new Shopping("0007", "Description 7", 7),
        ],
      },
      {
        reference: "0008",
        creationDate: new Date(),
        shoppings: [
          new Shopping("0008", "Description 8", 8),
          new Shopping("0008", "Description 8", 8),
          new Shopping("0008", "Description 8", 8),
        ],
      },
    ]);
  }
}
