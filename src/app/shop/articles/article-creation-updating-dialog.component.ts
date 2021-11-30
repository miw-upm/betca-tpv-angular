import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

import {Article} from '../shared/services/models/article.model';
import {Tax} from '../shared/services/models/Tax';
import {ArticleService} from './article.service';

@Component({
  templateUrl: 'article-creation-updating-dialog.component.html',
  styleUrls: ['article-dialog.component.css']
})

export class ArticleCreationUpdatingDialogComponent {
  taxValues = Object.keys(Tax).filter(key => isNaN(Number(key)));
  article: Article;
  title: string;
  oldBarcode: string;
  companies: Observable<string[]> = of([]);

  constructor(@Inject(MAT_DIALOG_DATA) data: Article, private articleService: ArticleService, private dialog: MatDialog) {
    this.title = data ? 'Update Article' : 'Create Article';
    this.article = data ? data : {
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
