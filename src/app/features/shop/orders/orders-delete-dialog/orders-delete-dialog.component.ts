import {Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
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
            closingDate: undefined, orderLinesList: []
        };
    }

    invalid(): boolean {
        return this.check(this.order);
    }

    check(order: Order): boolean {
        return order.closingDate !== undefined;
    }

    delete(): void {
        this.orderService
            .delete(this.order.reference)
            .subscribe(() => this.dialog.closeAll());
    }


}
