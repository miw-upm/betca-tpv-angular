import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedMessengerService {

  constructor() {
  }

  haveNewMessages(): Observable<any> {
    return of(true);
  }
  countNewMessage(): Observable<any> {
    return of(5);
  }
}
