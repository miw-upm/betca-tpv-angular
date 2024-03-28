import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: 'complaint-reply-dialog.component.html',
  styleUrls: ['complaint-dialog.component.css']
})

export class ComplaintReplyDialogComponent {
  reply: string = '';

  constructor(
    public dialogRef: MatDialogRef<ComplaintReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
