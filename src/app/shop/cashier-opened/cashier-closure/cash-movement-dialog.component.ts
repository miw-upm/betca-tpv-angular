import { Component, OnInit } from '@angular/core';
import {CashMovement} from "./cash-movement.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cash-movement-dialog',
  templateUrl: './cash-movement-dialog.component.html',
  styleUrls: ['./cash-movement-dialog.component.css']
})
export class CashMovementDialogComponent {
  cashMovement: CashMovement;
  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<CashMovementDialogComponent>,
              private router: Router) { }

  invalid() {
    return (!this.cashMovement.cash && this.cashMovement.cash !== 0)
      || (!this.cashMovement.cash && this.cashMovement.cash !== 0)
      || !this.cashMovement.comment;
  }

  save() {
    // Save the cash Movement
    this.router.navigate(['shop']).then().finally(() => this.dialog.closeAll());
  }
}
