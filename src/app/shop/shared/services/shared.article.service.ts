import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Article} from './models/article.model';
import {CustomerPointsConstants} from "@shared/models/customer-points.model";

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  private static BARCODE = '/barcode';

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
    return of(<Article> {
      barcode: CustomerPointsConstants.BARCODE,
      description: "POINTS DISCOUNT",
      retailPrice: -1 * (0.5*totalShoppingCart),
    });
  }
}
