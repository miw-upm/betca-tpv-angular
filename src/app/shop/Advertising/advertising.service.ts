import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Advertising} from "@shared/models/advertising.model";


@Injectable({
  providedIn: 'root',
})
export class AdvertisingService{
  getAll(): Observable<Advertising[]> {
    return of(this.mockAdvertising);
  }

  private mockAdvertising: Advertising[] = [
    {
      reference: 'dog',
      articleBarcode: '123',
      userMobile: '321',
      discount : 10,
      expiryDate : new Date()
    },
    {
    reference: 'cat',
  articleBarcode: 'xyz',
  userMobile: 'zyx',
  discount : 10,
  expiryDate : new Date()
}
    ];

  constructor() {
  }

  read(reference:string): Observable<Advertising> {
    const advertising: Advertising = this.mockAdvertising.find((t: Advertising) => t.reference === reference);
    return of(advertising);
  }
  delete(reference: string): Observable<void>{
    this.mockAdvertising = this.mockAdvertising.filter((t :Advertising) => t.reference !== reference);
    return of(undefined);
  }
}
