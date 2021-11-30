import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  templateUrl: 'number-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class NumberDialogComponent {
  value: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number) {
    this.value = data;
  }
}
