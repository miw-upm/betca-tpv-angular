import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '@core/http.service';
import { Message } from '../shared/services/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {

  private listSent: Message[] = [];
  private listReceived: Message[] = [];

  constructor() {
    let newMessage: Message;
    // Mock de mensajes enviados
    for (let index = 0; index < 3; index++) {
      newMessage = new Message();
      newMessage.fromUserMobile = '123456789';
      newMessage.toUserMobile = '987654321';
      newMessage.subject = 'Sent ' + index;
      newMessage.text = 'Sent Message text ' + index;
      this.listSent.push(newMessage);
    }

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
    return of(this.listSent);
  }

  getReceivedMessages(): Observable<Message[]> {
    return of(this.listReceived);
  }

}
