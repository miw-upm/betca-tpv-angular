import {AfterViewInit, Component} from '@angular/core';

import {OnlineOrderState} from "@shared/models/online-order-state";
import {OnlineOrdersService} from "@shared/services/online-orders.service";
import {of} from "rxjs";
import {OnlineOrder} from "@shared/models/online-order.model";

@Component({
  templateUrl: 'online-orders.component.html'
})
export class OnlineOrdersComponent implements AfterViewInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Manage online orders';
  onlineOrders = of([]);
  enumKeys= Object.entries(OnlineOrderState)
    .map(([key, value]) => ({ name:key,value:value }))
    .filter(pair => !isNaN(Number(pair.value)));

  constructor(private onlineOrderService: OnlineOrdersService) {

  }

  ngAfterViewInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.onlineOrders = this.onlineOrderService.search();
  }

  update(onlineOrder: OnlineOrder) {
    this.onlineOrderService.update(onlineOrder.reference, onlineOrder).subscribe(() => {
      this.reloadList();
    });
  }
}
