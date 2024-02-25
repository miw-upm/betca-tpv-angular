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
  private listReceived: Message[] = [];

  constructor(private httpService: HttpService) {
    let newMessage: Message;
    

    // Mock de mensajes recibidos
    for (let index = 0; index < 3; index++) {
      newMessage = new Message();
      newMessage.fromUserMobile = '987654321';
      newMessage.toUserMobile = '123456789';
      newMessage.subject = 'Received ' + index;
      newMessage.text = 'Received Message text ' + index;
      this.listReceived.push(newMessage);
    }
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
    );;
  }

  getReceivedMessages(): Observable<Message[]> {
    return of(this.listReceived);
  }

}
