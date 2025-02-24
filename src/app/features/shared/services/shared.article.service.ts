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


    searchBarcode(barcode: string): Observable<number[]> {
        return this.httpService
            .param('barcode', barcode)
            .get(EndPoints.ARTICLES + SharedArticleService.BARCODE)
            .pipe(
                map(response => response.barcodes)
            );
    }

}
