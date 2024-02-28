import {Component, OnInit} from '@angular/core';
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {OnlineOrdersService} from "@shared/services/online-orders.service";
import {of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit {

  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Refunds of online orders';
  onlineOrders = of([]);
  onlineOrderStateKeys = Object.values(OnlineOrderState);

  constructor(private onlineOrderService: OnlineOrdersService) { }

  ngOnInit(): void {
    this.onlineOrders = this.onlineOrderService.search().pipe(
        map(onlineOrder => onlineOrder.filter(row => this.showOnlineOrder(row.state)))
    );
  }

  showOnlineOrder(state: OnlineOrderState): boolean {
    return state == OnlineOrderState.DELIVERED ||
            state == OnlineOrderState.REFUND_REQUESTED ||
            state == OnlineOrderState.REFUNDED;
  }

  showRefundButton(state: OnlineOrderState): boolean {
    return state == OnlineOrderState.DELIVERED;
  }

  refundOnlineOrder(order: OnlineOrder){
    order.state = OnlineOrderState.REFUND_REQUESTED;
    this.onlineOrderService.update(order.reference, order);
  }

}
