import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {SlackMessage} from "@shared/models/slack-message.model";
import {CashierLast} from "../shared/services/models/cashier-last.model";

@Injectable({
  providedIn: 'root'
})
export class SlackMessagesService {

  constructor(private httpService: HttpService) {
  }


  create(slackMessage: SlackMessage): Observable<String>{
    return this.httpService
      .post(EndPoints.SLACK, slackMessage);
  }

  createCashierCloseMessage(cashierLast: CashierLast):Observable<String>{
    const slackMessage: SlackMessage = {
      type:"Info",
      subject: "Cashier Close Information Message",
      description: "A cashier has closed his module. \n Summary: \n Final Cash at close: "
        + cashierLast.finalCash
        + "\n at " + cashierLast.closureDate.toDateString(),
      annotation: ""

    }
    return this.httpService
      .post(EndPoints.SLACK, slackMessage);
  }

}
