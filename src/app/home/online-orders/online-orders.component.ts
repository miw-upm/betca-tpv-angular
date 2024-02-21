import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {OnlineOrder} from "../shared/online-order.model";
import {Shopping} from "../shopping-basket/shopping.model";
import {OnlineOrderState} from "../shared/online-order-state";

@Component({
  templateUrl: 'online-orders.component.html'
})
export class OnlineOrdersComponent {
  reference: string;
  title = 'Personal online orders';
  onlineOrders = of([]);

  private mockOnlineOrders: OnlineOrder[] = [
    { reference: "112233ascd", state: OnlineOrderState.PREPARING, deliveryDate: new Date(), ticketReference: "445566grtq"},
    { reference: "cgfdf45fsf", state: OnlineOrderState.SENT, deliveryDate: new Date(), ticketReference: "w3434dgbbg"},
    { reference: "2effbfhdgd", state: OnlineOrderState.DELIVERED, deliveryDate: new Date(), ticketReference: "eere4tfgb5"}
  ];

  constructor(private dialog: MatDialog) {
    this.onlineOrders = of(this.mockOnlineOrders);
  }

  read(onlineOrder: OnlineOrder): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Order Details',
        object: of(onlineOrder)
      }
    });
  }

  getOnlineOrders() {
    return this.onlineOrders;
  }
}
