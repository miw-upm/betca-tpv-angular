import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Provider} from './provider.model';
import {ProviderSearch} from './provider-search.model';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {
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
