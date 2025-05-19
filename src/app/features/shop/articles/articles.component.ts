import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import {MatFormFieldModule, MatLabel, MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule, MatOption} from '@angular/material/core';

import {ArticleService} from './article.service';
import {ReadDetailDialogComponent} from '@common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '@common/components/crud.component';
import {ArticleCreationUpdatingDialogComponent} from './article-creation-updating-dialog.component';
import {Article} from '../../shared/models/article.model';
import {ArticleSearch} from './article-search.model';
import {FilterInputComponent} from "@common/components/filter-input.component";
import {TagsService} from '../tags/services/tags.service';
import {Tag} from '../tags/models/tags.model';

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatSlideToggle, MatIcon, CrudComponent,
        FilterInputComponent, MatButton, MatCardTitle, MatSelectModule, MatFormFieldModule, MatInputModule, MatOptionModule, NgForOf, MatLabel, MatSelect, MatOption, MatFormField],
    templateUrl: 'articles.component.html',
    styles: [`
        mat-form-field {
            display: block;
            width: 100%;
            margin: 10px 0;
        }
        mat-select {
            width: 100%;
        }
    `]
})
export class ArticlesComponent implements OnInit {
    articleSearch: ArticleSearch;
    title = 'Articles management';
    articles = of([]);
    tags: Tag[] = [];

    constructor(
        private readonly dialog: MatDialog, 
        private readonly articleService: ArticleService,
        private readonly tagsService: TagsService
    ) {
        this.resetSearch();
    }

    ngOnInit(): void {
        this.loadTags();
    }

    loadTags(): void {
        this.tagsService.searchAll().subscribe(tags => {
            this.tags = tags;
        });
    }

    search(): void {
        this.articles = this.articleService.search(this.articleSearch)
            .pipe(
                map(articles => this.addTagIdToArticles(articles)),
                map(articles => this.removeTagIdColumn(articles))
            );
    }

    resetSearch(): void {
        this.articleSearch = {};
    }

    unfinished(): void {
        this.articles = this.articleService.searchUnfinished()
            .pipe(
                map(articles => this.addTagIdToArticles(articles)),
                map(articles => this.removeTagIdColumn(articles))
            );
    }

    private addTagIdToArticles(articles: Article[]): Article[] {
        return articles.map(article => {
            const articleWithTagId = { ...article };
            if (article.tag) {
                articleWithTagId.tag.id = article.tag.id;
            } else {
                articleWithTagId.tag = { id: '', name: '', group: '', description: '' };
            }
            return articleWithTagId;
        });
    }

    private removeTagIdColumn(articles: Article[]): Article[] {
        return articles.map(article => {
            // Create a new object without modifying the original
            const articleWithoutTagId = { ...article };

            // Remove tagId property if it exists
            if ('tagId' in articleWithoutTagId) {
                delete articleWithoutTagId['tagId'];
            }

            // Create a new tag object without the id property
            if (articleWithoutTagId.tag) {
                const { id, ...tagWithoutId } = articleWithoutTagId.tag;
                articleWithoutTagId.tag = { ...tagWithoutId, id };

                // Set a special property to prevent the id from being displayed as a column
                Object.defineProperty(articleWithoutTagId.tag, 'id', {
                    value: id,
                    enumerable: false
                });
            }

            return articleWithoutTagId;
        });
    }

    create(): void {
        const dialogRef = this.dialog.open(ArticleCreationUpdatingDialogComponent);
        dialogRef.componentInstance.articleCreated.subscribe(() => {
            this.search();
        });
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
