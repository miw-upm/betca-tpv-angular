import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {CrudComponent} from "@common/components/crud.component";
import {FilterInputComponent} from "@common/components/filter-input.component";
import {MatButton} from "@angular/material/button";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {OrderSearch} from "./order-search.model";
import {OrderService} from "./orders.service";
import {Order} from "../shared/models/order.model";
import {OrdersCreationUpdatingDialogComponent} from "./orders-creation-updating-dialog.component";

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatSlideToggle, MatIcon, CrudComponent,
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
        this.dialog.open(OrdersCreationUpdatingDialogComponent);
    }

    read(order: Order): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Order Details',
                object: this.orderService.read(order.reference)
            }
        });
    }

    update(order: Order): void {
        this.orderService.read(order.reference)
            .subscribe(fullOrder => this.dialog.open(OrdersCreationUpdatingDialogComponent, {data: fullOrder}));
    }
}