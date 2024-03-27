import {Component, OnInit} from '@angular/core';
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {of} from "rxjs";
import {RefundsService} from "./refunds.service";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
})
export class RefundsComponent implements OnInit {

  displayedColumns = ['id', 'reference', 'state', 'deliveryDate', 'ticketReference', 'actions'];
  title = 'Refunds of online orders';
  onlineOrders = of([]);

  constructor(private refundsService: RefundsService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.onlineOrders = this.refundsService.searchUserRefunds();
  }

  showRefundButton(state: OnlineOrderState): boolean {
    return state.toString() === OnlineOrderState[OnlineOrderState.DELIVERED];
  }

  refundOnlineOrder(onlineOrder: OnlineOrder){
    onlineOrder.state = OnlineOrderState.REFUND_REQUESTED;
    this.refundsService.updateOnlineOrderState(onlineOrder.reference, onlineOrder)
      .subscribe(() => {
        this.loadList();
      });
  }

}
