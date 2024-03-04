import { Component, Inject, OnInit } from '@angular/core';
import { Order } from "../order.model";
import { MatTableDataSource } from "@angular/material/table";
import { OrderLine } from "../orderline.model";
import { take } from "rxjs";
import { OrdersService } from "../orders.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public isCreationMode: boolean = false;
  public currentActiveOrder: Order;
  public currentActiveOrderLinesDataSource: MatTableDataSource<OrderLine>;
  public currentActiveOrderIsClosed: boolean = false;
  private orderIdParameter: string | undefined;

  constructor(private ordersService: OrdersService,
              private snackbarService: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { orderReference: string },
              private dialog: MatDialogRef<OrderDetailsComponent>
  ) {
  }

  ngOnInit(): void {
    this.orderIdParameter = this.data.orderReference;
    if (this.orderIdParameter === undefined) {
      this.isCreationMode = true;
      this.currentActiveOrder = { reference: '', description: '', providerCompany: '', openingDate: new Date(), orderLines: [] };
    } else {
      this.loadOrderInfoById(this.orderIdParameter);
    }
    this.refreshTable();
  }


  public loadOrderInfoById(orderId: string): void {
    this.ordersService.readByReference(orderId.toString())
      .subscribe((order: Order) => {
        this.currentActiveOrder = order;
        this.currentActiveOrderIsClosed = order.closingDate !== undefined;
        this.refreshTable();
      });
  }

  public addNewOrderLine(): void {
    this.currentActiveOrder.orderLines.push({ articleBarcode: undefined, requiredAmount: undefined, finalAmount: undefined });
    this.refreshTable();
  }

  public removeOrderLine(orderLine: OrderLine): void {
    this.currentActiveOrder.orderLines.splice(this.currentActiveOrder.orderLines.indexOf(orderLine), 1);
    this.refreshTable();
  }

  public saveOrder(): void {
    if (this.isCreationMode) {
      this.ordersService.create(this.currentActiveOrder); // .subscribe();
    } else {
      this.ordersService.update(this.currentActiveOrder.reference, this.currentActiveOrder); // .subscribe();
    }
    this.snackbarService.open("Changes saved successfully.", "Dismiss", { duration: 2000 });
    this.dialog.close({ isCreation: this.isCreationMode, reference: this.currentActiveOrder.reference });
  }

  public cancelNewOrder(): void {
    this.dialog.close();
  }

  public deleteOrder(): void {
    this.ordersService.delete(this.currentActiveOrder.reference); // .subscribe();
    this.snackbarService.open("Order deleted successfully.", "Dismiss", { duration: 2000 });
    this.dialog.close();
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
      openingDate: undefined,
      closingDate: undefined,
      orderLines: this.currentActiveOrder.orderLines.map(orderLine => ({ articleBarcode: orderLine.articleBarcode, requiredAmount: orderLine.requiredAmount, finalAmount: undefined }))
    };
    this.ordersService.create(newOrder); // .subscribe();
    this.snackbarService.open(`Order copied successfully with reference ${newOrder.reference}.`, "Dismiss", { duration: 2000 });
    this.dialog.close();
  }

  private refreshTable(): void {
    if (this.currentActiveOrderLinesDataSource === undefined)
      this.currentActiveOrderLinesDataSource = new MatTableDataSource<OrderLine>();
    this.currentActiveOrderLinesDataSource.data = this.currentActiveOrder.orderLines;
  }
}
