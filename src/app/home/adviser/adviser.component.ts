import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagService} from "../../shop/tags/tag.service";
import { Article} from "../shared/article.model";
import {SlideInterface} from "@shared/components/carousel/slide.interface";

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  articles: Article[] = [];
  slides: SlideInterface[] = [];
  selectedTag: string = '';

  constructor(private tagService: TagService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedTag = params['tag'];
      if (this.selectedTag) {
        this.loadArticles(this.selectedTag);
      }
    });
  }

  loadArticles(tagName: string): void {
    this.tagService.read(tagName).subscribe(tag => {
      if (tag) {
        this.articles = tag.articles;
        this.prepareSlides();
      } else {
        this.articles = [];
        console.error('Tag not found:', tagName);
      }
    });
  }

  prepareSlides(): void {
    this.slides = this.articles.map(article => ({
      description: article.description,
      strip: this.selectedTag ? this.selectedTag : '',
      url: null
    }));
  }
}
