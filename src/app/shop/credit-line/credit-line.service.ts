import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {CreditLine} from './credit-line.model';
import {EndPoints} from '@shared/end-points';
import {CreditSale} from './credit-sale.model';

@Injectable({
  providedIn: 'root',
})
export class CreditLineService {
  private SEARCH = '/search';
  private SEARCH_UNPAID = '/searchUnpaid';
  private PAY = '/pay';

  constructor(private httpService: HttpService) {
  }
  create(credit: CreditLine): Observable<CreditLine> {
    return this.httpService
      .post(EndPoints.CREDIT, credit);
  }
  findByUserReference(userReference: string): Observable<CreditLine> {
    return this.httpService
      .get(EndPoints.CREDIT + this.SEARCH + '?userReference=' + userReference);
  }

  findUnpaidTicketsFromCreditLineByMobile(userReference: string): Observable<[]> {
    return this.httpService
      .get(EndPoints.CREDIT + this.SEARCH_UNPAID + '?userReference=' + userReference);
  }

  payUnpaidTicketsFromCreditLine(userReference: string, cashOrCard: string): Observable<CreditLine>{
    return this.httpService
      .put(EndPoints.CREDIT + '/' + userReference + this.PAY + '/' + cashOrCard);
  }

}
