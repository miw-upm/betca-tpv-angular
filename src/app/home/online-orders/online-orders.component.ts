import {AfterViewInit, Component} from '@angular/core';

import {OnlineOrderState} from "@shared/models/online-order-state";
import {OnlineOrdersService} from "@shared/services/online-orders.service";
import {of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  templateUrl: 'online-orders.component.html'
})
export class OnlineOrdersComponent implements AfterViewInit {
  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference'];
  title = 'Manage online orders';
  onlineOrders = of([]);
  onlineOrderStateKeys = Object.keys(OnlineOrderState).filter(key => isNaN(Number(key)));

  constructor(private onlineOrderService: OnlineOrdersService) {

  }

  ngAfterViewInit(): void {
    this.onlineOrders = this.onlineOrderService.searchPersonal()
      .pipe(map(onlineOrders =>
        onlineOrders.map(onlineOrder => {
          onlineOrder.state = OnlineOrderState[onlineOrder.state.toString()];
          return onlineOrder;
        })));
  }
}
