import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Article} from "../article.model";

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  read(description: string): Observable<Article> {
    return this.httpService
      .get(EndPoints.ARTICLES + '/' + description);
  }

  searchDescription(description: string): Observable<number[]> {
    return this.httpService
      .param('description', description)
      .get(EndPoints.ARTICLES + SharedArticleService.SEARCH)
      .pipe(
        map(response => response.barcodes)
      );
  }
}
