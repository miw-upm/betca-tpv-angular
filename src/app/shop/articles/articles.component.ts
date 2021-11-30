import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {Article} from '../shared/services/models/article.model';
import {ArticleService} from './article.service';
import {ArticleCreationUpdatingDialogComponent} from './article-creation-updating-dialog.component';
import {ArticleSearch} from './article-search.model';

@Component({
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent {
  barcode: string;
  articleSearch: ArticleSearch;
  title = 'Articles management';
  articles = of([]);

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
    this.resetSearch();
  }

  search(): void {
    this.articles = this.articleService.search(this.articleSearch);
  }

  resetSearch(): void {
    this.articleSearch = {};
  }

  unfinished(): void {
    this.articles = this.articleService.searchUnfinished();
  }

  create(): void {
    this.dialog.open(ArticleCreationUpdatingDialogComponent);
  }

  read(article: Article): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Article Details',
        object: this.articleService.read(article.barcode)
      }
    });
  }

  update(article: Article): void {
    this.articleService.read(article.barcode)
      .subscribe(fullArticle => this.dialog.open(ArticleCreationUpdatingDialogComponent, {data: fullArticle}));
  }
}
