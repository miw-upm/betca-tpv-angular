import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {BudgetsService} from "../budgets/budgets.service";

@Component({
  selector: 'app-search-by-reference',
  templateUrl: './search-by-reference.component.html',
})
export class SearchByReferenceComponent {
  references: Observable<string[]> = of([]);

  @Input() reference: string;
  @Input() showText: boolean = true;
  @Output() add = new EventEmitter<string>();

  constructor(private budgetService: BudgetsService) {
  }

  public onSelect(value): void {
    this.add.emit(value);
  }

  searchByReference(): void {
    this.references = this.budgetService.searchReference(this.reference);
  }
}
