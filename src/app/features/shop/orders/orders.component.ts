import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {CrudComponent} from "@common/components/crud.component";
import {FilterInputComponent} from "@common/components/filter-input.component";
import {MatButton} from "@angular/material/button";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {OrderSearch} from "./order-search.model";
import {OrderService} from "./orders.service";
import {Order} from "../shared/models/order.model";

import {OrdersCreationDialogComponent} from "./orders-creation-dialog/orders-creation-dialog.component";
import {OrdersUpdatingDialogComponent} from "./orders-updating-dialog/orders-updating-dialog.component";
import {ReadOrderDetailDialogComponent} from "./orders-reading-dialog/read-order-detail.dialog.component";

import {OrdersDeleteDialogComponent} from "./orders-delete-dialog/orders-delete-dialog.component";
@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatIcon, CrudComponent,
        FilterInputComponent, MatButton, MatCardTitle],
    templateUrl: 'orders.component.html'
})

export class OrdersComponent {
    orderSearch: OrderSearch;
    title = 'Orders management';
    orders = of([]);

    constructor(private readonly dialog: MatDialog, private readonly orderService: OrderService) {
        this.resetSearch();
    }

    search(): void {
        this.orders = this.orderService.search(this.orderSearch);
    }

    resetSearch(): void {
        this.orderSearch = {reference: "", description: "", providerCompany: undefined, openingDate: undefined, closingDate: undefined};
    }

    create(): void {
        this.dialog.open(OrdersCreationDialogComponent);
    }

    read(order: Order): void {
        this.dialog.open(ReadOrderDetailDialogComponent, {
            data: {
                title: 'Order Details',
                object: this.orderService.read(order.reference)
            }
        });
    }

    update(order: Order): void {
        this.orderService.read(order.reference)
            .subscribe(fullOrder => this.dialog.open(OrdersUpdatingDialogComponent, {data: fullOrder}));
    }

    delete(order: Order): void {
        this.orderService.read(order.reference)
            .subscribe(fullOrder => this.dialog.open(OrdersDeleteDialogComponent, {data: fullOrder}));
    }
}