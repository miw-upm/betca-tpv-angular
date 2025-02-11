import {Component, Inject} from '@angular/core';
import {Article} from '../../shared/services/models/article.model';
import {SharedArticleService} from '../../shared/services/shared.article.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  standalone:true,
  templateUrl: 'article-quick-creation-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatInput,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    MatError,
    MatButton
  ],
  styleUrls: ['shopping-cart.component.css']
})
export class ArticleQuickCreationDialogComponent {

  article: Article;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private readonly articleService: SharedArticleService,
              private readonly dialogRef: MatDialogRef<ArticleQuickCreationDialogComponent>) {
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
