import { Component, EventEmitter, Output } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { FilterInputComponent } from "@common/components/filter-input.component";

@Component({
  selector: "app-budget-filters",
  imports: [MatIcon, MatDivider, MatButton, FilterInputComponent, MatToolbar],
  templateUrl: "./budget-filters.component.html",
  styleUrl: "./budget-filters.component.css",
  standalone: true,
})
export class BudgetFiltersComponent {
  @Output() search = new EventEmitter<string>();

  public reference: string;

  onSearch() {
    this.search.emit(this.reference);
  }
}
