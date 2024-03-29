import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {Complaint} from './complaint.model';
import {ComplaintService} from './complaint.service';
import {AuthService} from '@core/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'complaint-creation-dialog.component.html',
  styleUrls: ['complaint-dialog.component.css']
})

export class ComplaintCreationDialogComponent {
  complaint: Complaint;

  constructor(private complaintService: ComplaintService, private dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any ) {
    if (data && data.complaint) {
      this.complaint = data.complaint;
    } else {
      this.complaint = {barcode: undefined, description: undefined, state: "open"};
    }
  }

  create(): void {
    this.complaintService
      .create(this.complaint)
      .subscribe(() => {
          this.dialog.closeAll();
          this.snackBar.open('Your claim has been successfully created! Thank you!', 'Close', {
          duration: 3000
          });
      });
  }

  invalid(): boolean {
    return this.check(this.complaint.barcode) || this.check(this.complaint.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
