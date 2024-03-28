import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {of, Observable} from 'rxjs';

import { AuthService } from '@core/auth.service'; 
import {ComplaintCreationDialogComponent} from './complaint-creation-dialog.component';
import {ComplaintService} from './complaint.service';
import {Complaint} from './complaint.model';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import { ComplaintReplyDialogComponent } from './complaint-reply-dialog.component';

@Component({
  selector: 'app-complaints',
  templateUrl: 'complaints.component.html',

})
export class ComplaintsComponent {
  title = 'Complaints management';
  complaints$: Observable<Complaint[]>; 
  isManager: boolean;

  constructor(private dialog: MatDialog, private complaintService: ComplaintService,  private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.complaints$ = this.complaintService.searchAll(); 
    this.isManager = this.authService.untilManager(); 
  }

  create(): void {
    this.dialog
      .open(ComplaintCreationDialogComponent)
      .afterClosed()
      .subscribe(() => this.searchAll());
  }

  searchAll(): void {
    this.complaints$ = this.complaintService.searchAll();
  }

  read(complaint: Complaint): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Complaint Details',
        object: this.complaintService.read(complaint.id)
      }
    });
  }

  delete(complaint: Complaint): void {
    this.complaintService
      .delete(complaint.id)
      .subscribe(() => this.searchAll());
  }

  onUpdate(complaint: Complaint): void {
    const dialogRef = this.dialog.open(ComplaintCreationDialogComponent, {
      data: { complaint: {...complaint} }
    });

    dialogRef.afterClosed().subscribe((editedComplaint: Complaint) => {
      if (editedComplaint) {
        this.updateComplaint(editedComplaint);
      }
    });
  }

  updateComplaint(editedComplaint: Complaint): void {
    this.complaintService.update(editedComplaint).subscribe({
      next: () => {
        this.snackBar.open('Complaint updated successfully', 'Close', {
          duration: 3000
        });
        this.searchAll();
      },
      error: () => {
        this.snackBar.open('Error updating complaint', 'Close', {
          duration: 3000
        });
      }
    });
  }

  openReplyDialog(complaintId: string): void {
    const dialogRef = this.dialog.open(ComplaintReplyDialogComponent, {
      width: '500px',
      data: { complaintId }
    });
  
    dialogRef.afterClosed().subscribe(reply => {
      if (reply) {
        this.replyAndCloseComplaint(complaintId, reply);
      }
    });
  }

  replyAndCloseComplaint(complaintId: string, reply: string): void {
    if (reply.trim()) {
      this.complaintService.closeComplaint(complaintId, reply).subscribe(() => {
        this.snackBar.open('Complaint has been successfully replied to and closed.', 'Close', { duration: 3000 });
        this.searchAll();
      });
    } else {
      this.snackBar.open('Reply cannot be empty.', 'Close', { duration: 3000 });
    }
  }
}
