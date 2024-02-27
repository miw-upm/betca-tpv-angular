import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrderState} from "@shared/models/online-order-state";

@Injectable({
  providedIn: 'root',
})
export class OnlineOrdersService {

  private mockOnlineOrders: OnlineOrder[] = [
    { reference: "112233ascd", state: OnlineOrderState.PREPARING, deliveryDate: null, ticketReference: "445566grtq"},
    { reference: "cgfdf45fsf", state: OnlineOrderState.SENT, deliveryDate: null, ticketReference: "w3434dgbbg"},
    { reference: "2effbfhdgd", state: OnlineOrderState.DELIVERED, deliveryDate: new Date(), ticketReference: "eere4tfgb5"},
    { reference: "435bknsdff", state: OnlineOrderState.REFUND_REQUESTED, deliveryDate: new Date(), ticketReference: "w3434tfgb5"},
    { reference: "458dsfdsfs", state: OnlineOrderState.REFUND_REQUESTED, deliveryDate: new Date(), ticketReference: "jyhg4w5164"},
    { reference: "458dsfdsfs", state: OnlineOrderState.REFUNDED, deliveryDate: new Date(), ticketReference: "eere4w3434"}
  ];

  constructor() {}

  search(): Observable<OnlineOrder[]> {
    return of(this.mockOnlineOrders);
  }

  update(reference: string, updatedOnlineOrder: OnlineOrder): Observable<OnlineOrder> {
    const index = this.mockOnlineOrders.findIndex(oo => oo.reference === reference);
    if (index > -1) {
      if(updatedOnlineOrder.state == OnlineOrderState.DELIVERED) {
        updatedOnlineOrder.deliveryDate = new Date();
      }
      this.mockOnlineOrders[index] = updatedOnlineOrder;
    } else {
      console.error('Online order not found for update:', reference);
    }
    return of(this.mockOnlineOrders[index]);
  }
}
