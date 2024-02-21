import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagService} from "../../shop/tags/tag.service";
import { Article} from "../shared/article.model";

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  articles: Article[] = [];
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
      } else {
        this.articles = [];
        console.error('Tag not found:', tagName);
      }
    });
  }

  addToBasket(article: Article): void {
    // TODO: implement
  }
}
