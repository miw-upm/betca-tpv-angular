import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdviserService } from "./adviser.service";
import { Article} from "../../shop/shared/services/models/article.model";
import { SlideInterface } from "@shared/components/carousel/slide.interface";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  articles: Article[] = [];
  slides: SlideInterface[] = [];
  selectedTag: string = '';

  constructor(
    private adviserService: AdviserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedTag = params['tag'] || 'New';
      if (!params['tag']) {
        this.redirectToNewTagView();
      } else {
        this.loadArticles(this.selectedTag);
      }
    });
  }

  loadArticles(tagName: string): void {
    this.adviserService.findArticlesByTagName(tagName).subscribe({
      next: (articles) => {
        if (articles && articles.length) {
          this.articles = articles;
          this.prepareSlides();
        } else {
          this.redirectToNewTagView();
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.redirectToNewTagView();
        }
      }
    });
  }

  prepareSlides(): void {
    this.slides = this.articles.map(article => ({
      description: article.description,
      strip: this.selectedTag,
      url: null,
      article: article
    }));
  }

  private redirectToNewTagView(): void {
    this.router.navigate(['/home/adviser'], { queryParams: { tag: 'New' } });
  }
}
