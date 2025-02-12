import {Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import {Article} from '../../shared/models/article.model';
import {SharedArticleService} from '../../shared/services/shared.article.service';

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, MatInput, MatFormField, MatDialogActions, MatDialogClose,
        MatError, MatButton],
    templateUrl: 'article-quick-creation-dialog.component.html',
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
