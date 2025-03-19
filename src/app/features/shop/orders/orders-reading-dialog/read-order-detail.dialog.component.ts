import {Component, Inject} from '@angular/core';
import {AsyncPipe, NgIf, NgFor} from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {Observable} from 'rxjs';
import {OrdersCreationDialogComponent} from "../orders-creation-dialog/orders-creation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
    standalone: true,
    imports: [MatDialogContent, AsyncPipe, MatLabel, MatDialogActions, MatDialogClose, MatButton,
        NgIf, NgFor, MatDialogTitle],
    templateUrl: 'read-order-detail.dialog.component.html',
    styleUrls: ['./read-order-detail.dialog.component.css']
})

export class ReadOrderDetailDialogComponent {
    title: string;
    object: Observable<any>;
    constructor(@Inject(MAT_DIALOG_DATA) data: any, private readonly dialog: MatDialog) {
        this.title = data.title;
        this.object = data.object;
    }

    labels(object): string[] {
        return Object.getOwnPropertyNames(object);
    }

    duplicateOrder(): void {
        this.object
            .subscribe(order =>{
                order.closingDate = undefined;
                this.dialog.open(OrdersCreationDialogComponent, {data: order})
            });
    }
}
