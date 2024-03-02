import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from '@shared/models/tag.model';
import { Article } from "../shared/services/models/article.model";
import { TagService } from './tag.service';
import { ArticleService } from '../articles/article.service';
import { ArticleSearch } from "../articles/article-search.model";

interface DialogData extends Tag {
  readOnly?: boolean;
}

@Component({
  selector: 'app-tag-creation-updating-dialog',
  templateUrl: 'tag-creation-reading-updating-dialog.component.html',
  styleUrls: ['tag-creation-reading-updating-dialog.component.css']
})
export class TagCreationReadingUpdatingDialogComponent implements OnInit {
  tag: Tag;
  title: string;
  articles: Article[];
  selectedArticles: Article[] = [];
  articleSearch: ArticleSearch = {};
  readOnly: boolean = false;
  originalTagName: string;
  originalTagGroup: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tagService: TagService,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
    this.title = !this.data ? 'Create Tag' : this.data.readOnly ? 'Read Tag' : 'Update Tag';
    this.tag = this.data ? this.cloneTag(data) : { name: '', group: '', description: '', articles: [] };
    this.readOnly = this.data?.readOnly ?? false;
    if (this.data) {
      this.originalTagName = this.data.name;
      this.originalTagGroup = this.data.group;
    }
  }

  ngOnInit(): void {
    this.articleService.search({}).subscribe(articlesResponse => {
      this.articles = articlesResponse;
      if (this.tag.articles) {
        this.selectedArticles = this.tag.articles.map(article => article);
      }
    });
    this.fetchInitialArticles();
    this.resetArticleSearch();
  }

  isCreate(): boolean {
    return !this.data;
  }

  create(): void {
    // TODO: Implement create
  }

  update(): void {
    // TODO: Implement update
  }

  toggleArticleSelection(article: Article): void {
    const index = this.selectedArticles.findIndex(a => a.barcode === article.barcode);
    if (index > -1) {
      this.selectedArticles.splice(index, 1);
    } else {
      this.selectedArticles.push(article);
    }
  }

  isArticleSelected(article: Article): boolean {
    return this.selectedArticles.some(a => a.barcode === article.barcode);
  }

  fetchInitialArticles(): void {
    // TODO: Implement fetchInitialArticles
  }

  searchArticles(): void {
    // TODO: Implement searchArticles
  }

  resetArticleSearch(): void {
    this.articleSearch = {};
  }

  private cloneTag(tag: Tag): Tag {
    return JSON.parse(JSON.stringify(tag));
  }

  hasArticles(): boolean {
    return this.tag.articles && this.tag.articles.length > 0;
  }

  isFormValid(): boolean {
    return this.tag.name.trim() !== '' && this.tag.group.trim() !== '';
  }

  onSubmit(): void {
    console.log('selectedArticles:', this.selectedArticles);
    if (this.isCreate()) {
      this.create();
    } else {
      this.update();
    }
  }

  showCreateUpdateButton(): string {
    return this.isCreate() ? 'Create' : 'Update';
  }
}
