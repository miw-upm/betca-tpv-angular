import { Component, OnInit } from '@angular/core';
import {SlideInterface} from "@shared/components/carousel/slide.interface";
import {AdviserService} from "../adviser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Article} from "../../../shop/shared/services/models/article.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css']
})
export class Top5Component implements OnInit {

  articles: Article[] = [];
  slides: SlideInterface[] = [];
  selectedTag: string = '';

  constructor(
    private adviserService: AdviserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.adviserService.findTopFiveArticles().subscribe({
      next: (articles) => {
        if (articles && articles.length) {
          this.articles = articles;
          this.mapArticlesToSlides();
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

  mapArticlesToSlides(): void {
    this.slides = this.articles.map((article, index)  => ({
      description: article.description,
      strip: `Top ${index + 1}`,
      url: null,
      article: article
    }));
  }

  private redirectToNewTagView(): void {
    this.router.navigate(['/home/adviser'], { queryParams: { tag: 'New' } });
  }

}
