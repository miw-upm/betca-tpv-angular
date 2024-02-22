import {AfterViewInit, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {OnlineOrder} from "../shared/online-order.model";
import {Shopping} from "../shopping-basket/shopping.model";
import {OnlineOrderState} from "../shared/online-order-state";
import {Tax} from "../../shop/shared/services/models/Tax";

@Component({
  templateUrl: 'online-orders.component.html'
})
export class OnlineOrdersComponent implements AfterViewInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference'];
  title = 'Personal online orders';
  onlineOrders : OnlineOrder[] = [];
  onlineOrderStateKeys = Object.values(OnlineOrderState);

  private mockOnlineOrders: OnlineOrder[] = [
    { reference: "112233ascd", state: OnlineOrderState.PREPARING, deliveryDate: null, ticketReference: "445566grtq"},
    { reference: "cgfdf45fsf", state: OnlineOrderState.SENT, deliveryDate: null, ticketReference: "w3434dgbbg"},
    { reference: "2effbfhdgd", state: OnlineOrderState.DELIVERED, deliveryDate: new Date(), ticketReference: "eere4tfgb5"}
  ];

  constructor(private dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
    this.onlineOrders = [...this.mockOnlineOrders];
  }
}
