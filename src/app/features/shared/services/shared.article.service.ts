import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';

@Injectable({providedIn: 'root'})
export class SharedArticleService {
    private static readonly BARCODE = '/barcode';

    constructor(private readonly httpService: HttpService) {
    }

<<<<<<< HEAD:src/app/features/shared/services/shared.article.service.ts
=======
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

>>>>>>> develop:src/app/features/shop/shared/services/shared.article.service.ts
    searchBarcode(barcode: string): Observable<number[]> {
        return this.httpService
            .param('barcode', barcode)
            .get(EndPoints.ARTICLES + SharedArticleService.BARCODE)
            .pipe(
                map(response => response.barcodes)
            );
    }

}
