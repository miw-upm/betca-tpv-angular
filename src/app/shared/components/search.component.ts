import {Component, EventEmitter, Input, Output} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent {
  @Input() title = 'Search';
  @Input() key: string;
  @Input() keys = of([]);
  @Input() obligatory = "false";

  @Output() keyChange = new EventEmitter<string>();
  @Output() renew = new EventEmitter<any>();
  @Output() selected = new EventEmitter<string>();

  onRenew(): void {
    this.renew.emit();
  }

  resetKey(): void {
    this.key = '';
    this.keyChange.emit(this.key);
  }

  onClick(value): void {
    this.selected.emit(value);
  }

  public onChange(value: string): void {
    this.keyChange.emit(value);
  }
}
