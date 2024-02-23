import { Component, OnInit } from '@angular/core';
import {of} from "rxjs";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {OnlineOrdersService} from "@shared/services/online-orders.service";
import {map} from "rxjs/operators";
import {OnlineOrder} from "@shared/models/online-order.model";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Manage refunds';
  onlineOrders = of([]);
  enumKeys= Object.entries(OnlineOrderState)
    .map(([key, value]) => ({ name:key,value:value }))
    .filter(pair => !isNaN(Number(pair.value)) && this.onlineOrderStateOptions(pair.name));

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
      state == OnlineOrderState.REFUNDED;
  }

  onlineOrderStateOptions(value: string): boolean {
    return value == OnlineOrderState[OnlineOrderState.REFUND_REQUESTED.valueOf()] ||
      value == OnlineOrderState[OnlineOrderState.REFUNDED.valueOf()];
  }

  update(onlineOrder: OnlineOrder) {
    this.onlineOrderService.update(onlineOrder.reference, onlineOrder).subscribe(() => {
      this.reloadList();
    });
  }
}
