import {Injectable} from '@angular/core';

import {Article} from '../shared/article.model';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Shopping} from "./shopping.model";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {

  constructor(private httpService: HttpService) {
  }

  addArticle(article: Article): void {
    console.log('Article added to shopping basket: ' + article.description);
  }

  read(newBarcode: string): Observable<Shopping> {
    const price: number = Number(newBarcode.replace(',', '.'));
    return this
      .readBarcode(newBarcode)
      .pipe(
        map(article => {
            return new Shopping(article);
          }
        )
      );
  }

  readBarcode(barcode: string): Observable<Article> {
    return this.httpService
      .get(EndPoints.ARTICLES + '/' + barcode);
  }
}
