import { Injectable } from '@angular/core';
import { HttpService } from '@core/http.service';
import { EndPoints } from '@shared/end-points';
import { Observable,  } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedMessengerService {

  public static CHECK_NEW_MESSAGES = '/countNew';

  constructor(private httpService: HttpService) {
  }

  countNewMessage(): Observable<Number> {
    return this.httpService.get(EndPoints.MESSENGER + SharedMessengerService.CHECK_NEW_MESSAGES);
  }
}
