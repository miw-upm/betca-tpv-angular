import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Article} from '../shared/services/models/article.model';
import {ArticleSearch} from './article-search.model';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  static SEARCH = '/search';
  static UNFINISHED = '/unfinished';

  constructor(private httpService: HttpService) {
  }

  create(article: Article): Observable<Article> {
    return this.httpService
      .post(EndPoints.ARTICLES, article);
  }

  read(barcode: string): Observable<Article> {
    return this.httpService
      .get(EndPoints.ARTICLES + '/' + barcode);
  }

  update(oldBarcode: string, article: Article): Observable<Article> {
    return this.httpService
      .successful()
      .put(EndPoints.ARTICLES + '/' + oldBarcode, article);
  }

  search(articleSearch: ArticleSearch): Observable<Article[]> {
    return this.httpService
      .paramsFrom(articleSearch)
      .get(EndPoints.ARTICLES + ArticleService.SEARCH);
  }

  searchUnfinished(): Observable<Article[]> {
    return this.httpService
      .get(EndPoints.ARTICLES + ArticleService.UNFINISHED);
  }
}

