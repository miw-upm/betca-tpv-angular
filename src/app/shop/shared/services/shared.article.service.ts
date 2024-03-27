import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Article} from './models/article.model';

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  private static BARCODE = '/barcode';
  private static SEARCH: string = '/search';
  private static MOBILE: string = 'mobile';
  private static CART_TOTAL: string = 'cartTotal';
  private static DISCOUNT_ARTICLE_ENDPOINT = EndPoints.ARTICLES+'/discount';

  constructor(private httpService: HttpService) {
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
  getPointsDiscountArticleForUser(mobileNumber: string, totalShoppingCart: number): Observable<Article> {
    return this.httpService
      .param(SharedArticleService.MOBILE, mobileNumber)
      .param(SharedArticleService.CART_TOTAL, totalShoppingCart.toString())
      .get(SharedArticleService.DISCOUNT_ARTICLE_ENDPOINT+SharedArticleService.SEARCH)
  }
}
