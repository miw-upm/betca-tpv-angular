import { Component } from "@angular/core";
import { CrudComponent } from "@common/components/crud.component";
import { Observable, of } from "rxjs";
import { Budget } from "../../models/budget";
import { Shopping } from "app/features/shop/cashier-opened/shopping-cart/shopping.model";

@Component({
  selector: "app-budget-list",
  imports: [CrudComponent],
  templateUrl: "./budget-list.component.html",
  styleUrl: "./budget-list.component.css",
  standalone: true,
})
export class BudgetListComponent {
  budgets$: Observable<Budget[]> = of([
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

  onCreate() {
    throw new Error("Method not implemented.");
  }

  onRead($event: any) {
    throw new Error("Method not implemented.");
  }

  onUpdate($event: any) {
    throw new Error("Method not implemented.");
  }
}
