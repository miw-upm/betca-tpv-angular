import {Injectable} from '@angular/core';

import {HttpService} from '@core/http.service';
import {CreditLine} from './credit-line.model';
import {EndPoints} from '@shared/end-points';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CreditLineService {
  private PAY = '/pay';

  constructor(private httpService: HttpService) {
  }
  create(credit: CreditLine): Observable<CreditLine> {
    return this.httpService.post(EndPoints.CREDIT, credit);
  }
  findCreditByUserReference(userReference: string): Observable<CreditLine> {
    return this.httpService
      .get(EndPoints.CREDIT + "/" +  userReference);
  }



  payUnpaidTicketsFromCreditLine(userReference: string, cashOrCard: string): Observable<CreditLine>{
    return this.httpService.put(EndPoints.CREDIT + '/' + userReference + this.PAY + '/' + cashOrCard);
  }

}
