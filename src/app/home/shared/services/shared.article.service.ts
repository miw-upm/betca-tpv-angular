import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {map} from "rxjs/operators";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";
import {Shopping} from "@shared/models/shopping.model";

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  private static SEARCH: string = '/search';

  constructor(private httpService: HttpService) {
  }

  search(description: string): Observable<string[]> {
    return this.read(description).pipe(map(shoppings =>
      shoppings.map(shopping => shopping.description)));
  }

  read(description: string): Observable<Shopping[]> {
    return this.httpService
      .get(EndPoints.ARTICLES + SharedArticleService.SEARCH + "?description=" + description)
      .pipe(
        map(articles =>
          articles.map(article => {
            return new Shopping(article.barcode, article.description, article.retailPrice);
          })
        )
      );
  }
}
