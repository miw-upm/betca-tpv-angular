import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import { SlackMessage} from '../models/slackMessage.models';


@Injectable({providedIn: 'root'})
export class SharedSlackService {

    constructor(private readonly httpService: HttpService) {
    }

    publish(slackMessage: SlackMessage): Observable<void> {
      return this.httpService.post(EndPoints.SLACK_PUBLISH, slackMessage);
    }




}