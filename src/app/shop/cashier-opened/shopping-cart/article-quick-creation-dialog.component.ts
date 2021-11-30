import {Component, Inject} from '@angular/core';
import {Article} from '../../shared/services/models/article.model';
import {SharedArticleService} from '../../shared/services/shared.article.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: 'article-quick-creation-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class ArticleQuickCreationDialogComponent {

  article: Article;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private articleService: SharedArticleService,
              private dialogRef: MatDialogRef<ArticleQuickCreationDialogComponent>) {
    this.article = data;
  }

  invalidArticle(): boolean {
    return !this.article.description || !this.article.retailPrice;
  }

  create(): void {
    this.articleService
      .create(this.article)
      .subscribe(newArticle => this.dialogRef.close(newArticle));
  }
}
