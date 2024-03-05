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
  tag: Tag = this.initTag();
  title: string = this.initTitle();
  articles: Article[] = [];
  selectedArticles: Article[] = this.data?.articles || [];
  articleSearch: ArticleSearch = {};
  readOnly: boolean = this.data?.readOnly ?? false;
  originalTagName: string;
  originalTagGroup: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tagService: TagService,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
    if (this.data) {
      this.originalTagName = this.data.name;
      this.originalTagGroup = this.data.group;
    }
  }

  ngOnInit(): void {
    this.fetchInitialArticles();
  }

  initTag(): Tag {
    return this.data ? { ...this.data } : { name: '', group: '', description: '', articles: [] };
  }

  initTitle(): string {
    return this.data ? (this.data.readOnly ? 'Read Tag' : 'Update Tag') : 'Create Tag';
  }

  toggleArticleSelection(article: Article): void {
    const index = this.selectedArticles.findIndex(a => a.barcode === article.barcode);
    if (index >= 0) {
      this.selectedArticles.splice(index, 1);
    } else {
      this.selectedArticles.push(article);
    }
  }

  isArticleSelected(article: Article): boolean {
    return this.selectedArticles.some(a => a.barcode === article.barcode);
  }

  fetchInitialArticles(): void {
    this.articleService.search(this.articleSearch).subscribe(articles => {
      this.articles = this.filterAndMergeArticles(articles);
    });
  }

  searchArticles(): void {
    this.fetchInitialArticles();
  }

  filterAndMergeArticles(articles: Article[]): Article[] {
    const mergedArticles = [...this.selectedArticles];
    articles.forEach(article => {
      if (!mergedArticles.some(a => a.barcode === article.barcode)) {
        mergedArticles.push(article);
      }
    });
    return mergedArticles.slice(0, 5);
  }

  hasArticles(): boolean {
    return !!this.tag.articles && this.tag.articles.length > 0;
  }

  isFormValid(): boolean {
    return this.tag.name.trim() !== '' && this.tag.group.trim() !== '';
  }

  onSubmit(): void {
    this.tag.articles = this.selectedArticles;
    if (this.isCreate()) {
      this.tagService.create(this.tag).subscribe(() => this.dialog.closeAll());
    } else {
      this.tagService.update(this.originalTagName, this.originalTagGroup, this.tag).subscribe(() => this.dialog.closeAll());
    }
  }

  isCreate(): boolean {
    return !this.data;
  }

  showCreateUpdateButton(): string {
    return this.isCreate() ? 'Create' : 'Update';
  }
}
