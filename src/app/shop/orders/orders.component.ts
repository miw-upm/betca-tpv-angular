import { Component } from '@angular/core';
import { Order } from "./order.model";
import { Observable, of } from "rxjs";
import { OrdersService } from "./orders.service";
import { OrderSearch } from "./ordersearch.model";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { OrderDetailsComponent } from "./order-details/order-details.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  public title: string = "Provider orders";
  public orders: Observable<Order[]> = of([]);
  public orderSearch: OrderSearch;

  constructor(private orderService: OrdersService,
              private dialog: MatDialog
  ) {
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
    const dialogInstance: MatDialogRef<OrderDetailsComponent> = this.dialog.open(OrderDetailsComponent, {
      data: { orderReference: undefined },
      height: '70%',
      width: '90%',
      disableClose: true
    });
    dialogInstance.afterClosed().subscribe(() => this.search());
  }

  public details(order: Order): void {
    const dialogInstance: MatDialogRef<OrderDetailsComponent> = this.dialog.open(OrderDetailsComponent, {
      data: { orderReference: order.reference },
      height: '70%',
      width: '90%',
      disableClose: true
    });
    dialogInstance.afterClosed().subscribe(() => this.search());
  }
}
