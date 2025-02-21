import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CrudComponent } from "@common/components/crud.component";
import { Observable } from "rxjs";
import { Budget } from "../../models/budget";

@Component({
  selector: "app-budget-list",
  imports: [CrudComponent],
  templateUrl: "./budget-list.component.html",
  styleUrl: "./budget-list.component.css",
  standalone: true,
})
export class BudgetListComponent {
  @Input() budgets$: Observable<Budget[]>;

  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() read: EventEmitter<Budget> = new EventEmitter();
  @Output() update: EventEmitter<Budget> = new EventEmitter();

  onCreate() {
    this.create.emit();
  }

  onRead(budget: Budget) {
    this.read.emit(budget);
  }

  onUpdate(budget: Budget) {
    this.update.emit(budget);
  }
}
