import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';

@Injectable({providedIn: 'root'})
export class HomeArticleService {
    private static readonly PURCHASED = '/barcodes/purchased/without-complaints';

    constructor(private readonly httpService: HttpService) {
    }
    searchBarcodePurchasedByUserLogged(barcode: string): Observable<number[]> {
        return this.httpService
            .param('barcode', barcode)
            .get(EndPoints.ARTICLES + HomeArticleService.PURCHASED)
            .pipe(
                map(response => response.barcodes)
            );
    }

}
