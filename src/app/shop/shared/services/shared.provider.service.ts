import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class SharedProviderService {
  private static COMPANY = '/company';

  constructor(private httpService: HttpService) {
  }

  searchCompanies(company: string): Observable<string[]> {
    return this.httpService
      .param('company', company)
      .get(EndPoints.PROVIDERS + SharedProviderService.COMPANY)
      .pipe(
        map(response => response.companies)
      );
  }

}
