import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Article} from '../../../shared/models/article.model';

@Injectable({providedIn: 'root'})
export class SharedShopArticleService {
    private static readonly BARCODE = '/barcode';

    constructor(private readonly httpService: HttpService, private readonly sharedArticleService: SharedArticleService) {
    }

    read(barcode: string): Observable<Article> {
        return this.httpService
            .get(EndPoints.ARTICLES + '/' + barcode);
    }

    create(article: Article): Observable<Article> {
        return this.httpService
            .post(EndPoints.ARTICLES, article);
    }

    update(article: Article): Observable<Article> {
        return this.httpService
            .put(EndPoints.ARTICLES + '/' + article.barcode, article);
    }

    searchBarcode(barcode: string): Observable<number[]> {
        return this.httpService
            .param('barcode', barcode)
            .get(EndPoints.ARTICLES + SharedShopArticleService.BARCODE)
            .pipe(
                map(response => response.barcodes)
            );
    }


    getArticlesByCompany(company: string): Observable<any[]> {
        // TO DO
        return of([
            { barcode: 'Article 1' },
            { barcode: 'Article 2' },
            { barcode: 'Article 3' }
        ]);
    }
}
