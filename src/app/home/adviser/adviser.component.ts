import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService} from "@shared/services/tag.service";
import { Article } from "../shared/article.model";
import { SlideInterface } from "@shared/components/carousel/slide.interface";

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
    private tagService: TagService,
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
    this.tagService.findArticlesByTagName(tagName).subscribe(articles => {
      if (articles && articles.length) {
        this.articles = articles;
        this.prepareSlides();
      } else {
        this.articles = [];
        this.redirectToNewTagView();
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
    this.router.navigate(['/home/adviser'], { queryParams: { tag: 'New' } })
      .then(success => {
        if (success) {
          console.log('Redirected to /adviser with tag=New');
        } else {
          console.error('Failed to redirect to /adviser with tag=New');
        }
      })
      .catch(error => {
        console.error('Error during navigation:', error);
      });
  }
}
