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

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.title = data.title;
        this.object = data.object;
    }

    labels(object): string[] {
        return Object.getOwnPropertyNames(object);
    }
}
