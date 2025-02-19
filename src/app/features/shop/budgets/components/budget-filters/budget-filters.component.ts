import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-budget-filters",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  templateUrl: "./budget-filters.component.html",
  styleUrl: "./budget-filters.component.css",
  standalone: true,
})
export class BudgetFiltersComponent {}
