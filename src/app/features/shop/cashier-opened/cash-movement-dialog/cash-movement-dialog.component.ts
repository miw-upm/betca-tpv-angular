import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatLabel} from "@angular/material/form-field";
import {Observable} from "rxjs";
import {CashierState} from "../cashier-closure/cashier-state.model";
import {MatButton} from "@angular/material/button";
import {map} from "rxjs/operators";
import {CashierClosureService} from "../cashier-closure/cashier-closure.service";

@Component({
  selector: 'app-cash-movement-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatIcon,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    MatLabel
  ],
  templateUrl: './cash-movement-dialog.component.html',
  standalone: true,
  styleUrl: './cash-movement-dialog.component.css'
})
export class CashMovementDialogComponent {

  protected amount: number;
  cashierState: Observable<CashierState>;

  constructor(private readonly dialog: MatDialog, private readonly dialogRef: MatDialogRef<CashMovementDialogComponent>,
              private readonly cashierService: CashierClosureService) {
    this.cashierState = this.cashierService.readState();
  }

  close(): void {
    this.cashierService.readState()
        .pipe(
            map(cashierState => {
              cashierState.totalCash += this.amount;
              this.cashierService.updateState(cashierState)
            })
        ).subscribe(
            () => this.dialogRef.close()
        );
  }

  invalid(): boolean {
    return !this.amount || this.amount === 0;
  }
}
