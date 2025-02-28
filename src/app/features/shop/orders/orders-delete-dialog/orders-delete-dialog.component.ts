import {Component, Inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {OrderService} from '../orders.service';
import {Order} from '../../shared/models/order.model';
@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, MatLabel,
        MatDialogActions, MatDialogClose, MatButton,
        MatDatepickerModule, MatInputModule],
    templateUrl: 'orders-delete-dialog.component.html',
    styleUrls: ['orders-delete-dialog.component.css']
})
export class OrdersDeleteDialogComponent {
    order: Order;
    title: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: Order, private readonly orderService: OrderService,
    private readonly dialog: MatDialog) {
        this.title = 'Delete Order';
        this.order = data || {
            reference: undefined, description: undefined, providerCompany: undefined, openingDate: undefined,
            closingDate: undefined, orderLines: []
        };
    }


    invalid(): boolean {
        console.log(this.check(this.order));
        return this.check(this.order);
    }

    check(order): boolean {
        return order.closingDate !== undefined;
    }
    delete(): void {
        this.orderService
            .delete(this.order)
            .subscribe(() => this.dialog.closeAll());
    }


}
