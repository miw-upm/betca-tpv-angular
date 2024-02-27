import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Advertising} from "@shared/models/advertising.model";
import {Message} from "../shared/services/models/message.model";

@Injectable({
  providedIn: 'root',
})
export class AdvertisingService{

  private listAdvertisingHistory:Advertising[] = [];
  constructor() {
    let newAdvertising: Advertising;
    //mock
    for (let index = 0; index < 5; index++){
      newAdvertising = new Advertising();
      newAdvertising.reference = 'dog';
      newAdvertising.articleBarcode ='123';
      newAdvertising.userMobile = '123'
      newAdvertising.discount = 10;
      newAdvertising.expiryDate = new Date();
      this.listAdvertisingHistory.push(newAdvertising);
    }
  }

  getAdvertisingHistory(): Observable<Advertising[]> {
    return of(this.listAdvertisingHistory);
  }
}
