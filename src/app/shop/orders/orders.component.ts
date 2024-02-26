import { Component } from '@angular/core';
import { Order } from "./order.model";
import { Observable, of } from "rxjs";
import { OrdersService } from "./orders.service";
import { OrderSearch } from "./ordersearch.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  public title: string = "Provider orders";
  public orders: Observable<Order[]> = of([]);
  public orderSearch: OrderSearch;

  constructor(private orderService: OrdersService, private router: Router) {
    this.resetSearch();
  }

  public search(): void {
    this.orders = this.orderService.search(this.orderSearch);
  }

  public resetSearch(): void {
    this.orderSearch = {};
    this.search();
  }

  public create(): void {
    // TODO To be implemented
  }

  public details(order: Order): void {
    // TODO To be implemented
  }
}
