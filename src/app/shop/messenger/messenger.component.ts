import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Observable, map, of } from 'rxjs';
import { Message } from '../shared/services/models/message.model';
import { MessengerService } from './messenger.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  receiveditle: string = "Received Messages";
  sentTitle: string = "Sent Messages";

  receivedMessages: Observable<Message[]> = this.messengerService.getReceivedMessages();
  sentMessages: Observable<Message[]> = this.messengerService.getSentMessages();

  newMessage = new Message();

  constructor(private messengerService: MessengerService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getReceivedMessages(): Observable<Message[]> {
    return this.receivedMessages;
  }

  getSentMessages(): Observable<Message[]> {
    return this.sentMessages;
  }

  sendMessage(): void {
    this.newMessage.fromUserMobile = this.authService.getMobile().toString();
    this.messengerService.sendNewMessage(this.newMessage).subscribe(() => {
      // Limpia el formulario después de enviar el mensaje
      this.newMessage = new Message();
    });

  }
  receivedMessagesLength(): Observable<number> {
    return this.receivedMessages.pipe(
      map(messages => messages.length)
    );
  }
   



}
