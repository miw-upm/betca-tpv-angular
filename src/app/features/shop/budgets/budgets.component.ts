import { Component, Inject, OnInit } from "@angular/core";
import { BudgetFiltersComponent } from "./components/budget-filters/budget-filters.component";
import { BudgetListComponent } from "./components/budget-list/budget-list.component";
import {
  BUDGET_SERVICE,
  IBudgetService,
} from "./services/interfaces/budget.interface";
import { Observable } from "rxjs";
import { Budget } from "./models/budget";
import { BudgetService } from "./services/budget.service";
import { MatDialog } from "@angular/material/dialog";
import { BudgetCreateComponent } from "./components/budget-create/budget-create.component";
import { BudgetUpdateComponent } from "./components/budget-update/budget-update.component";
import { BudgetDetailsComponent } from "./components/budget-details/budget-details.component";

@Component({
  selector: "app-budgets",
  imports: [BudgetFiltersComponent, BudgetListComponent],
  providers: [
    {
      provide: BUDGET_SERVICE,
      useClass: BudgetService,
    },
  ],
  templateUrl: "./budgets.component.html",
  styleUrl: "./budgets.component.css",
  standalone: true,
})
export class BudgetsComponent implements OnInit {
  budgets$: Observable<Budget[]>;

  constructor(
    private readonly budgetService: BudgetService,
    private readonly dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.budgets$ = this.budgetService.search({ reference: "0001" });
  }

  onUpdate(budget: Budget) {
    this.dialogService.open(BudgetUpdateComponent, {
      data: budget,
    });
  }

  onRead(budget: Budget) {
    this.dialogService.open(BudgetDetailsComponent, {
      data: budget,
    });
  }

  onCreate() {
    this.dialogService.open(BudgetCreateComponent);
  }
}
