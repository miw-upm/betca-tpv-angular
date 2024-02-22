import {Component, OnInit} from '@angular/core';
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrderState} from "@shared/models/online-order-state";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit {

  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Refunds of online orders';
  onlineOrders : OnlineOrder[] = [];
  onlineOrderStateKeys = Object.values(OnlineOrderState);

  private mockOnlineOrders: OnlineOrder[] = [
    { reference: "112233ascd", state: OnlineOrderState.PREPARING, deliveryDate: null, ticketReference: "445566grtq"},
    { reference: "cgfdf45fsf", state: OnlineOrderState.SENT, deliveryDate: null, ticketReference: "w3434dgbbg"},
    { reference: "2effbfhdgd", state: OnlineOrderState.DELIVERED, deliveryDate: new Date(), ticketReference: "eere4tfgb5"},
    { reference: "435bknsdff", state: OnlineOrderState.REFUND_REQUESTED, deliveryDate: new Date(), ticketReference: "w3434tfgb5"},
    { reference: "458dsfdsfs", state: OnlineOrderState.REFUNDED, deliveryDate: new Date(), ticketReference: "eere4w3434"}
  ];

  constructor() { }

  ngOnInit(): void {
    this.onlineOrders = [...this.mockOnlineOrders].filter(row => this.showOnlineOrder(row.state));
  }

  showOnlineOrder(state: OnlineOrderState): boolean {
    return state == OnlineOrderState.DELIVERED ||
            state == OnlineOrderState.REFUND_REQUESTED ||
            state == OnlineOrderState.REFUNDED;
  }

  refundOnlineOrder(order: OnlineOrder){

  }

}
