import { Component } from "@angular/core";
import { BudgetFiltersComponent } from "./components/budget-filters/budget-filters.component";
import { BudgetListComponent } from "./components/budget-list/budget-list.component";

@Component({
  selector: "app-budgets",
  imports: [BudgetFiltersComponent, BudgetListComponent],
  templateUrl: "./budgets.component.html",
  styleUrl: "./budgets.component.css",
  standalone: true,
})
export class BudgetsComponent {}
