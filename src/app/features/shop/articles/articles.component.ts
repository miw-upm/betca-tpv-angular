import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ArticleService} from './article.service';
import {ReadDetailDialogComponent} from '@common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '@common/components/crud.component';
import {ArticleCreationUpdatingDialogComponent} from './article-creation-updating-dialog.component';
import {Article} from '../shared/models/article.model';
import {ArticleSearch} from './article-search.model';
import {FilterInputComponent} from "@common/components/filter-input.component";

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatSlideToggle, MatIcon, CrudComponent,
        FilterInputComponent, MatButton, MatCardTitle],
    templateUrl: 'articles.component.html'
})
export class ArticlesComponent {
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
