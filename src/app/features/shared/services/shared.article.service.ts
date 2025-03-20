import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';

@Injectable({providedIn: 'root'})

export class SharedArticleService {
    private static readonly BARCODE = '/barcode';
    private static readonly PURCHASED = '/barcodes/purchased/without-complaints';
    private static readonly SEARCH_BY_PROVIDER = '/search-by-provider';


    constructor(private readonly httpService: HttpService) {
    }
    searchBarcodePurchasedByUserLogged(barcode: string): Observable<number[]> {
        return this.httpService
            .param('barcode', barcode)
            .get(EndPoints.ARTICLES + SharedArticleService.PURCHASED)
            .pipe(
                map(response => response.barcodes)
            );
    }
    
    searchByProviderCompanies(company: string): Observable<number[]> {
        return this.httpService
            .param('providerCompany', company)
            .get(EndPoints.ARTICLES + SharedArticleService.SEARCH_BY_PROVIDER)
    }
}
