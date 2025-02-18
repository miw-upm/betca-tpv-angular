import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {Observable} from 'rxjs';

import {CashierClosureService} from './cashier-closure.service';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';

@Component({
    standalone: true,
    imports: [MatDialogTitle, AsyncPipe, MatDialogContent, MatFormField, MatLabel, FormsModule, MatInput, MatIcon,
        MatDialogActions, MatDialogClose, MatButton],
    templateUrl: 'cashier-dialog.component.html',
    styleUrls: ['cashier-dialog.component.css']
})
export class CashierDialogComponent {
    cashierFinal: CashierClosure = {finalCash: null, finalCard: null, comment: undefined};
    cashierState: Observable<CashierState>;

    constructor(private readonly dialog: MatDialog, private readonly dialogRef: MatDialogRef<CashierDialogComponent>,
                private readonly cashierService: CashierClosureService) {
        this.cashierState = this.cashierService.readState();
    }

    close(): void {
        this.cashierService
            .close(this.cashierFinal)
            .subscribe(() => this.dialogRef.close());
    }

    invalid(): boolean {
        return (!this.cashierFinal.finalCash && this.cashierFinal.finalCash !== 0)
            || (!this.cashierFinal.finalCard && this.cashierFinal.finalCard !== 0)
            || !this.cashierFinal.comment;
    }

    cashMovement(): void {
        // TODO ...
        console.log('In construction!!!');
    }

}
