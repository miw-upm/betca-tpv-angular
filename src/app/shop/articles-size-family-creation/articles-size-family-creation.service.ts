import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Article} from '../shared/services/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesSizeFamilyCreationService {
  static SEARCH = '/search';
  static UNFINISHED = '/unfinished';

  constructor(private httpService: HttpService) {
  }

  create(article: Article): Observable<Article> {
    return this.httpService
      .post(EndPoints.ARTICLES, article);
  }
}
