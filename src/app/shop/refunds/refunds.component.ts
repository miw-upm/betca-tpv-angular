import {Component, OnInit} from '@angular/core';
import {of} from "rxjs";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrdersService} from "../online-orders/online-orders.service";
import {RefundsService} from "./refunds.service";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html'
})
export class RefundsComponent implements OnInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Manage refunds';
  onlineOrders = of([]);

  constructor(private onlineOrderService: OnlineOrdersService, private refundsService: RefundsService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.onlineOrders = this.refundsService.searchAdminRefunds();
  }

  showActionButtons(state: OnlineOrderState): boolean {
    return state.toString() === OnlineOrderState[OnlineOrderState.REFUND_REQUESTED];
  }

  acceptRefund(onlineOrder: OnlineOrder) {
    onlineOrder.state = OnlineOrderState.REFUNDED;
    this.update(onlineOrder);
  }

  declineRefund(onlineOrder: OnlineOrder) {
    onlineOrder.state = OnlineOrderState.REFUND_DECLINED;
    this.update(onlineOrder);
  }

  update(onlineOrder: OnlineOrder) {
    this.onlineOrderService.update(onlineOrder.reference, onlineOrder)
      .subscribe(() => {
        this.loadList();
      });
  }
}
