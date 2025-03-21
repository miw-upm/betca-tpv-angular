import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CrudComponent } from "@common/components/crud.component";
import { Observable } from "rxjs";
import { Budget, BudgetRowData } from "../../models/budget";

@Component({
  selector: "app-budget-list",
  imports: [CrudComponent],
  templateUrl: "./budget-list.component.html",
  styleUrl: "./budget-list.component.css",
  standalone: true,
})
export class BudgetListComponent {
  @Input() budgetRowData$: Observable<BudgetRowData[]>;

  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() read: EventEmitter<BudgetRowData> = new EventEmitter();
  @Output() update: EventEmitter<BudgetRowData> = new EventEmitter();
  @Output() delete: EventEmitter<BudgetRowData> = new EventEmitter();

  onCreate() {
    this.create.emit();
  }

  onRead(budget: BudgetRowData) {
    this.read.emit(budget);
  }

  onUpdate(budget: BudgetRowData) {
    this.update.emit(budget);
  }

  onDelete(budget: BudgetRowData) {
    this.delete.emit(budget);
  }
}
