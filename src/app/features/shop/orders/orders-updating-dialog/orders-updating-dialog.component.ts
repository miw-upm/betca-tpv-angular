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
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatInput,
        NgIf, MatDialogActions, MatDialogClose, MatButton,
        NgForOf, MatDatepickerModule, MatInputModule],
    templateUrl: 'orders-updating-dialog.component.html',
    styleUrls: ['orders-updating-dialog.component.css']
})
export class OrdersUpdatingDialogComponent {
    order: Order;
    title: string;
    oldReference: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: Order, private readonly orderService: OrderService,        
    private readonly dialog: MatDialog) {
        this.title = 'Update Order';
        this.order = data;
        this.oldReference = data.reference;
    }

    invalid(): boolean {
        return this.order.closingDate ? true : false;
    }

    update(): void {
        this.order.closingDate = new Date();
        this.orderService
            .update(this.oldReference, this.order)
            .subscribe(() => this.dialog.closeAll());
    }
}
