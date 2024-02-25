import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { HttpService } from '@core/http.service';
import { Message } from '../shared/services/models/message.model';
import { EndPoints } from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {

  private static SENT_ENDPOINT = '/sent';
  private static RECIEVED_ENPOINT = '/received';

  constructor(private httpService: HttpService) {
  }

  sendNewMessage(message: Message): Observable<void> {
    return of();
  }

  getSentMessages(): Observable<Message[]> {
    return this.httpService.get(EndPoints.MESSENGER + MessengerService.SENT_ENDPOINT).pipe(
      map(messages => messages.map(message => {
        delete message.id;
        delete message.isRead;
        return message;
      }))
    );
  }

  getReceivedMessages(): Observable<Message[]> {
    return this.httpService.get(EndPoints.MESSENGER + MessengerService.RECIEVED_ENPOINT).pipe(
      map(messages => messages.map(message => {
        delete message.id;
        delete message.isRead;
        return message;
      }))
    );
  }

}
