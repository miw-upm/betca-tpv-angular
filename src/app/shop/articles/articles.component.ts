import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ArticleService} from './article.service';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {CrudComponent} from '@shared/components/crud.component';
import {ArticleCreationUpdatingDialogComponent} from './article-creation-updating-dialog.component';
import {Article} from '../shared/models/article.model';
import {ArticleSearch} from './article-search.model';

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, MatLabel, MatFormField, FormsModule, MatInput, MatSlideToggle, MatIconButton,
        MatIcon, MatHint, CrudComponent, MatFabButton],
    templateUrl: 'articles.component.html'
})
export class ArticlesComponent {
    barcode: string;
    articleSearch: ArticleSearch;
    title = 'Articles management';
    articles = of([]);

    constructor(private readonly dialog: MatDialog, private readonly articleService: ArticleService) {
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
