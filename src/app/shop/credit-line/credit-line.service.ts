import {Injectable} from '@angular/core';

import {HttpService} from '@core/http.service';
import {CreditLine} from './credit-line.model';
import {EndPoints} from '@shared/end-points';
import {Observable} from "rxjs";
import {User} from "@shared/models/user.models";

@Injectable({
  providedIn: 'root',
})
export class CreditLineService {
  private PAY = '/pay';

  constructor(private httpService: HttpService) {
  }
  create(mobile: number): Observable<CreditLine> {
    const user : User = { mobile: mobile};
    const credit: CreditLine = {
      mobile: mobile.toString(),
      reference: mobile.toString(),
      user : user
    };
    return this.httpService.post(EndPoints.CREDIT, credit);
  }
  findCreditByUserReference(userReference: string): Observable<CreditLine> {
    return this.httpService
      .get(EndPoints.CREDIT + "/" +  userReference);
  }


  payUnpaidTicketsFromCreditLine(userMobile: string, cashOrCard: string): Observable<CreditLine>{
      return this.httpService.patch(EndPoints.CREDIT + '/' + userMobile + this.PAY + '/' + cashOrCard);
  }

}
