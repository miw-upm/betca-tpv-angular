import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Article} from "../article.model";
import {Shopping} from "../../shopping-basket/shopping.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {

  constructor() {
  }

  private mockArticles: Article[] = [
    { barcode: "111111", description: "Primer producto", retailPrice: 10},
    { barcode: "222222", description: "Segundo producto", retailPrice: 20},
    { barcode: "333333", description: "Tercer producto", retailPrice: 30},
    { barcode: "444444", description: "Cuarto producto", retailPrice: 40},
    { barcode: "555555", description: "Quinto producto", retailPrice: 50},
  ];

  search(description: string): Observable<string[]> {
    if (!description.trim()) {
      return of(this.mockArticles.map(a => a.description));
    }
    return of(this.mockArticles.filter(article => article.description.toLowerCase().includes(description.toLowerCase()))
      .map(a => a.description));
  }

  read(description: string): Observable<Shopping> {
    return this
      .readDescription(description)
      .pipe(
        map(article => {
            return new Shopping(article);
          }
        )
      );
  }

  readDescription(description: string): Observable<Article> {
    const index = this.mockArticles.findIndex(a => a.description == description);
    if (index > -1) {
      return of(this.mockArticles[index])
    } else {
      return of();
    }
  }
}
