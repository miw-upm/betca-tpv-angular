import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {CashierClosureService} from './cashier-closure.service';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'cashier-dialog.component.html',
  styleUrls: ['cashier-dialog.component.css']
})
export class CashierDialogComponent {
  cashierFinal: CashierClosure = {finalCash: null, finalCard: null, comment: undefined};
  cashierState: Observable<CashierState>;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashierDialogComponent>,
              private cashierService: CashierClosureService) {
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
