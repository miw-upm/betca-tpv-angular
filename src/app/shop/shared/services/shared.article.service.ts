import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Article} from './models/article.model';

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  private static readonly BARCODE = '/barcode';

  constructor(private readonly httpService: HttpService) {
  }

  read(barcode: string): Observable<Article> {
    return this.httpService
      .get(EndPoints.ARTICLES + '/' + barcode);
  }

  create(article: Article): Observable<Article> {
    return this.httpService
      .post(EndPoints.ARTICLES, article);
  }

  searchBarcode(barcode: string): Observable<number[]> {
    return this.httpService
      .param('barcode', barcode)
      .get(EndPoints.ARTICLES + SharedArticleService.BARCODE)
      .pipe(
        map(response => response.barcodes)
      );
  }

}
