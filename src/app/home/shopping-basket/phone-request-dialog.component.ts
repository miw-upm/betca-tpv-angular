import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: 'phone-request-dialog.component.html',
  styleUrls: ['./phone-request-dialog.component.css']
})
export class PhoneRequestDialogComponent {
  mobile: number;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<any>) {
  }

  sendPhone(): void {
    this.dialogRef.close(this.mobile);
  }
}
