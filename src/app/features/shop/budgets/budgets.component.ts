import { Component, OnInit } from "@angular/core";
import { BudgetFiltersComponent } from "./components/budget-filters/budget-filters.component";
import { BudgetListComponent } from "./components/budget-list/budget-list.component";
import { map, Observable } from "rxjs";
import { BudgetRowData } from "./models/budget";
import { BudgetService } from "./services/budget.service";
import { MatDialog } from "@angular/material/dialog";
import { BudgetUpdateDialogComponent } from "./components/budget-update-dialog/budget-update-dialog.component";
import { BudgetDetailsDialogComponent } from "./components/budget-details-dialog/budget-details-dialog.component";

@Component({
  selector: "app-budgets",
  imports: [BudgetFiltersComponent, BudgetListComponent],
  templateUrl: "./budgets.component.html",
  styleUrl: "./budgets.component.css",
  standalone: true,
})
export class BudgetsComponent implements OnInit {
  budgetRowData$: Observable<BudgetRowData[]>;

  constructor(
    private readonly budgetService: BudgetService,
    private readonly dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.budgetRowData$ = this.budgetService.search({ reference: "0001" }).pipe(
      map((budgets) =>
        budgets.map((budget) => ({
          reference: budget.reference,
          creationDate: budget.creationDate,
          total: budget.shoppingList.reduce(
            (acc, shopping) => acc + shopping.total,
            0
          ),
        }))
      )
    );
  }

  onUpdate(budget: BudgetRowData) {
    this.dialogService.open(BudgetUpdateDialogComponent, {
      data: budget,
    });
  }

  onRead(budget: BudgetRowData) {
    this.dialogService.open(BudgetDetailsDialogComponent, {
      data: budget,
    });
  }
}
