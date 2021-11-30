import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Complaint} from './complaint.model';
import {ComplaintService} from './complaint.service';
import {AuthService} from '@core/auth.service';

@Component({
  templateUrl: 'complaint-creation-dialog.component.html',
  styleUrls: ['complaint-dialog.component.css']
})

export class ComplaintCreationDialogComponent {
  complaint: Complaint;

  constructor(private complaintService: ComplaintService, private dialog: MatDialog, private authService: AuthService) {
    this.complaint = {barcode: undefined, description: undefined};
  }

  create(): void {
    this.complaintService
      .create(this.complaint)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.complaint.barcode) || this.check(this.complaint.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
