import {Injectable} from '@angular/core';

import {Article} from '../shared/article.model';
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {

  constructor(private httpService: HttpService) {
  }

  addArticle(article: Article): void {
    console.log('Article added to shopping basket: ' + article.description);
  }
}
