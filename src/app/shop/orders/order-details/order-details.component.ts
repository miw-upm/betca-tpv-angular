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
      this.currentActiveOrder = { reference: '', description: '', providerCompany: '', orderLines: [] };
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
      this.ordersService.create(this.currentActiveOrder).subscribe(
        (order: Order) => {
          this.snackbarService.open("Order created successfully.", "Dismiss", { duration: 2000 });
          this.dialog.close({ isCreation: this.isCreationMode, reference: order.reference });
        }
      );
    } else {
      this.ordersService.update(this.currentActiveOrder.reference, this.currentActiveOrder).subscribe(
        (order: Order) => {
          this.snackbarService.open("Changes saved successfully.", "Dismiss", { duration: 2000 });
          this.dialog.close({ isCreation: this.isCreationMode, reference: order.reference });
        }
      );
    }
  }

  public cancelNewOrder(): void {
    this.dialog.close();
  }

  public deleteOrder(): void {
    this.ordersService.delete(this.currentActiveOrder.reference).subscribe(
      () => {
        this.snackbarService.open("Order deleted successfully.", "Dismiss", { duration: 2000 });
        this.dialog.close({ isCreation: this.isCreationMode, reference: this.currentActiveOrder.reference });
      }
    );
  }

  public markAsClosed(): void {
    this.ordersService.markOrderAsClosed(this.currentActiveOrder.reference).subscribe(
      (order: Order) => {
        this.currentActiveOrder = order;
        this.currentActiveOrderIsClosed = true;
        this.snackbarService.open(`Order closed. Fill the final received amounts and press "Save".`, "Dismiss", { duration: 2000 });
        this.refreshTable();
      }
    );
  }

  public async copyToNewOrder(): Promise<void> {
    const newOrder: Order = {
      description: this.currentActiveOrder.description,
      providerCompany: this.currentActiveOrder.providerCompany,
      orderLines: this.currentActiveOrder.orderLines.map(orderLine => ({ articleBarcode: orderLine.articleBarcode, requiredAmount: orderLine.requiredAmount }))
    };
    this.ordersService.create(newOrder).subscribe(
      (order: Order) => {
        this.snackbarService.open(`Order copied successfully with reference ${order.reference}.`, "Dismiss", { duration: 2000 });
        this.dialog.close();
      }
    );
  }

  private refreshTable(): void {
    if (this.currentActiveOrderLinesDataSource === undefined)
      this.currentActiveOrderLinesDataSource = new MatTableDataSource<OrderLine>();
    this.currentActiveOrderLinesDataSource.data = this.currentActiveOrder.orderLines;
  }
}
