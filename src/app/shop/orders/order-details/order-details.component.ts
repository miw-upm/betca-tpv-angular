import { Component, Inject, OnInit } from '@angular/core';
import { Order } from "../order.model";
import { MatTableDataSource } from "@angular/material/table";
import { OrderLine } from "../orderline.model";
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
      this.refreshTable();
    } else {
      this.loadOrderInfoById(this.orderIdParameter);
    }
  }


  public loadOrderInfoById(orderId: string): void {
    this.ordersService.readByReference(orderId.toString())
      .subscribe((order: Order) => {
        this.currentActiveOrder = order;
        this.currentActiveOrderIsClosed = order.closingDate !== undefined;
        this.refreshTable();
      });
  }

  public addLine(): void {
    this.currentActiveOrder.orderLines.push({ articleBarcode: undefined, requiredAmount: undefined, finalAmount: undefined });
    this.refreshTable();
  }

  public removeLine(orderLine: OrderLine): void {
    this.currentActiveOrder.orderLines.splice(this.currentActiveOrder.orderLines.indexOf(orderLine), 1);
    this.refreshTable();
  }

  public save(): void {
    if (this.currentActiveOrder.description.length === 0 || this.currentActiveOrder.providerCompany.length === 0) {
      this.showSnackbar("Description and provider company are required fields.");
    } else {
      if (this.isCreationMode) {
        if (this.currentActiveOrder.orderLines.some((orderLine: OrderLine) => orderLine.requiredAmount === undefined)) {
          this.showSnackbar("Required amounts are not fulfilled for all order lines. Please fill all required amounts before saving.");
        } else {
          this.ordersService.create(this.currentActiveOrder).subscribe(
            (order: Order) => {
              this.showSnackbar("Order created successfully.");
              this.dialog.close({ isCreation: this.isCreationMode, reference: order.reference });
            }
          );
        }
      } else {
        if (this.currentActiveOrderIsClosed
          && this.currentActiveOrder.orderLines.some((orderLine: OrderLine) => orderLine.finalAmount === undefined)
        ) {
          this.showSnackbar("Final amounts are not fulfilled for all order lines. Please fill all final amounts before saving.");
        } else if (!this.currentActiveOrderIsClosed
          && this.currentActiveOrder.orderLines.some((orderLine: OrderLine) => orderLine.requiredAmount !== undefined)
        ) {
          this.showSnackbar("Required amounts are not fulfilled for all order lines. Please fill all required amounts before saving.");
        } else {
          this.ordersService.update(this.currentActiveOrder.reference, this.currentActiveOrder).subscribe(
            (order: Order) => {
              this.showSnackbar("Changes saved successfully.");
              this.dialog.close({ isCreation: this.isCreationMode, reference: order.reference });
            }
          );
        }
      }
    }
  }

  public delete(): void {
    this.ordersService.delete(this.currentActiveOrder.reference).subscribe(
      () => {
        this.showSnackbar("Order deleted successfully.");
        this.dialog.close({ isCreation: this.isCreationMode, reference: this.currentActiveOrder.reference });
      }
    );
  }

  public markAsClosed(): void {
    this.currentActiveOrderIsClosed = true;
    this.showSnackbar(`Fill the final received amounts and press "Save". Only when final amounts are fulfilled, order will be saved as closed.`);
  }

  private refreshTable(): void {
    if (this.currentActiveOrderLinesDataSource === undefined)
      this.currentActiveOrderLinesDataSource = new MatTableDataSource<OrderLine>();
    this.currentActiveOrderLinesDataSource.data = this.currentActiveOrder.orderLines;
  }

  public close(): void {
    this.dialog.close();
  }

  private showSnackbar(message: string): void {
    this.snackbarService.open(message, "Dismiss", { duration: 2000 });
  }
}
