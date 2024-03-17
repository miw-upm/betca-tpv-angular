import {Component, OnInit} from '@angular/core';
import {of} from "rxjs";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {map} from "rxjs/operators";
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrdersService} from "../online-orders/online-orders.service";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Manage refunds';
  onlineOrders = of([]);
  onlineOrderStateKeys = Object.keys(OnlineOrderState).filter(key => isNaN(Number(key)));

  constructor(private onlineOrderService: OnlineOrdersService) { }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.onlineOrders = this.onlineOrderService.search().pipe(
      map(onlineOrder => onlineOrder.filter(row => this.showOnlineOrder(row.state)))
    );
  }

  showOnlineOrder(state: OnlineOrderState): boolean {
    return state == OnlineOrderState.REFUND_REQUESTED ||
      state == OnlineOrderState.REFUNDED ||
      state == OnlineOrderState.REFUND_DECLINED;
  }

  showActionButtons(state: OnlineOrderState): boolean {
    return state == OnlineOrderState.REFUND_REQUESTED;
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
    this.onlineOrderService.update(onlineOrder.reference, onlineOrder).subscribe(() => {
      this.reloadList();
    });
  }
}
