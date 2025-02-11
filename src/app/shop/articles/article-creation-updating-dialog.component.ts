import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

import {Article} from '../shared/services/models/article.model';
import {Tax} from '../shared/services/models/Tax';
import {ArticleService} from './article.service';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {SearchByCompanyComponent} from '../shared/search-by-company.component';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  standalone:true,
  templateUrl: 'article-creation-updating-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatLabel,
    MatHint,
    MatInput,
    MatSelect,
    MatOption,
    MatSlideToggle,
    SearchByCompanyComponent,
    NgIf,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgForOf
  ],
  styleUrls: ['article-creation-updating-dialog.component.css']
})

export class ArticleCreationUpdatingDialogComponent {
  taxValues = Object.keys(Tax).filter(key => isNaN(Number(key)));
  article: Article;
  title: string;
  oldBarcode: string;
  companies: Observable<string[]> = of([]);

  constructor(@Inject(MAT_DIALOG_DATA) data: Article, private readonly articleService: ArticleService, private readonly dialog: MatDialog) {
    this.title = data ? 'Update Article' : 'Create Article';
    this.article = data || {
      barcode: undefined, description: undefined, retailPrice: undefined, providerCompany: undefined,
      discontinued: false, tax: Tax.GENERAL, stock: 10
    };
    this.oldBarcode = data ? data.barcode : undefined;
  }

  isCreate(): boolean {
    return this.oldBarcode === undefined;
  }

  create(): void {
    this.articleService
      .create(this.article)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.articleService
      .update(this.oldBarcode, this.article)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.article.barcode) || this.check(this.article.description) || this.check(this.article.providerCompany)
      || (this.article.retailPrice === undefined || null);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

}
