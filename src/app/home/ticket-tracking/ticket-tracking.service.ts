import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Shopping} from "../../shop/cashier-opened/shopping-cart/shopping.model";

@Injectable({
  providedIn: 'root'
})
export class TicketTrackingService {

  constructor() { }

  read(): Observable<Shopping[]> {
    const shopping1: Shopping = new Shopping('barcode1', 'description1',1);
    const shopping2: Shopping = new Shopping('barcode2', 'description2',2);
    const shopping3: Shopping = new Shopping('barcode3', 'description3',3);

    return of([shopping1, shopping2, shopping3]);
  }
}
