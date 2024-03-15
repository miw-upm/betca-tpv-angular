import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  templateUrl: './budget-expired.dialog.component.html',
  styleUrls: ['./budget-expired.dialog.component.css']
})
export class BudgetExpiredDialogComponent {
  creationDate: Date;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.creationDate = data.creationDate;
  }

}
