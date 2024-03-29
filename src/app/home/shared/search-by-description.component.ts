import {Observable, of} from 'rxjs';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedArticleService} from './services/shared.article.service';
import {Article} from "./article.model";

@Component({
  selector: 'app-search-by-description',
  templateUrl: './search-by-description.component.html'
})
export class SearchByDescriptionComponent {
  descriptions: Observable<String[]> = of([]);

  @Input() description: string;
  @Output() add = new EventEmitter<string>();

  constructor(private sharedArticleService: SharedArticleService) {
  }

  public onSelect(value): void {
    this.add.emit(value);
  }

  searchByDescription(): void {
    this.descriptions = this.sharedArticleService.search(this.description);
  }
}
