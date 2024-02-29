import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {SlackMessage} from "@shared/models/slack-message.model";

@Injectable({
  providedIn: 'root'
})
export class SlackMessagesService {

  private mockResponse = {
      message: "ok"
  }

  constructor(private httpService: HttpService) {
  }

  /*
  create(slackMessage: SlackMessage): Observable<String>{
    return this.httpService
      .post(EndPoints.SLACK, slackMessage);
  }
  */

  create(slackMessage: SlackMessage): Observable<String>{
    return of(this.mockResponse.message);
  }

}
