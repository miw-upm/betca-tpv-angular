import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Article} from '../../../shared/models/article.model';
import {SharedArticleService} from "../../../shared/services/shared.article.service";

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

    searchBarcode(barcode: string): Observable<number[]> {
        return this.sharedArticleService.searchBarcode(barcode);
    }

}
