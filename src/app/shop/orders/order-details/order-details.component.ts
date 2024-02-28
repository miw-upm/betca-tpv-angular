import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from "../order.model";
import { MatTableDataSource } from "@angular/material/table";
import { OrderLine } from "../orderline.model";
import { Subscription, take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from "../orders.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  public isCreationMode: boolean = false;
  public currentActiveOrder: Order;
  public currentActiveOrderLinesDataSource: MatTableDataSource<OrderLine>;
  public currentActiveOrderIsClosed: boolean = false;
  private orderIdParameter: number | undefined;
  private activatedRouteSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private ordersService: OrdersService,
              private router: Router,
              private snackbarService: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      this.orderIdParameter = params['id'];
      if (this.orderIdParameter === undefined) {
        this.isCreationMode = true;
        this.currentActiveOrder = { reference: '', description: '', providerCompany: '', openingDate: new Date(), orderLines: [] };
      } else {
        this.loadOrderInfoById(this.orderIdParameter);
      }
      this.refreshTable();
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
  }


  public loadOrderInfoById(orderId: number): void {
    this.ordersService.read(orderId.toString())
      .pipe(
        take(1)
      )
      .subscribe(order => {
        this.currentActiveOrder = order;
        this.currentActiveOrderIsClosed = order.closingDate !== undefined;
        this.refreshTable();
      });
  }


  private refreshTable(): void {
    if (this.currentActiveOrderLinesDataSource === undefined)
      this.currentActiveOrderLinesDataSource = new MatTableDataSource<OrderLine>();
    this.currentActiveOrderLinesDataSource.data = this.currentActiveOrder.orderLines;
  }


  public addNewOrderLine(): void {
    this.currentActiveOrder.orderLines.push({ articleBarcode: undefined, requiredAmount: undefined, finalAmount: undefined });
    this.refreshTable();
  }

  public removeOrderLine(orderLine: OrderLine): void {
    this.currentActiveOrder.orderLines.splice(this.currentActiveOrder.orderLines.indexOf(orderLine), 1);
    this.refreshTable();
  }


  public async saveOrder(): Promise<void> {
    if (this.isCreationMode) {
      this.ordersService.create(this.currentActiveOrder); // .subscribe();
    } else {
      this.ordersService.update(this.currentActiveOrder.reference, this.currentActiveOrder); // .subscribe();
    }
    await this.router.navigateByUrl('/shop/orders');
    this.snackbarService.open("Changes saved successfully.", "Dismiss", { duration: 2000 });
  }

  public async cancelNewOrder(): Promise<void> {
    await this.router.navigateByUrl('/shop/orders');
  }

  public async deleteOrder(): Promise<void> {
    this.ordersService.delete(this.currentActiveOrder.reference); // .subscribe();
    await this.router.navigateByUrl('/shop/orders');
    this.snackbarService.open("Order deleted successfully.", "Dismiss", { duration: 2000 });
  }

  public markAsClosed(): void {
    this.currentActiveOrder.closingDate = new Date();
    this.currentActiveOrderIsClosed = true;
    this.refreshTable();
    this.snackbarService.open(`Order closed. Fill the final received amounts and press "Save".`, "Dismiss", { duration: 6000 });
  }

  public async copyToNewOrder(): Promise<void> {
    const newOrder: Order = {
      reference: `FakeOrder${Math.floor(Math.random() * 1000)}`,
      description: this.currentActiveOrder.description,
      providerCompany: this.currentActiveOrder.providerCompany,
      openingDate: new Date(),
      closingDate: undefined,
      orderLines: this.currentActiveOrder.orderLines.map(orderLine => ({ articleBarcode: orderLine.articleBarcode, requiredAmount: orderLine.requiredAmount, finalAmount: undefined }))
    };
    this.ordersService.create(newOrder); // .subscribe();
    await this.router.navigateByUrl('/shop/orders');
    this.snackbarService.open(`Order copied successfully with reference ${newOrder.reference}.`, "Dismiss", { duration: 2000 });
  }
}
