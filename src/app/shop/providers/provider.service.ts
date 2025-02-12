import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Provider} from './provider.model';
import {ProviderSearch} from './provider-search.model';

@Injectable({providedIn: 'root'})
export class ProviderService {
    private static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(provider: Provider): Observable<Provider> {
        return this.httpService
            .post(EndPoints.PROVIDERS, provider);
    }

    read(company: string): Observable<Provider> {
        return this.httpService
            .get(EndPoints.PROVIDERS + '/' + company);
    }

    update(oldCompany: string, provider: Provider): Observable<Provider> {
        return this.httpService
            .successful()
            .put(EndPoints.PROVIDERS + '/' + oldCompany, provider);
    }

    search(providerSearch: ProviderSearch): Observable<Provider[]> {
        return this.httpService
            .paramsFrom(providerSearch)
            .get(EndPoints.PROVIDERS + ProviderService.SEARCH);
    }

}
