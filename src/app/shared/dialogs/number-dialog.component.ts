import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  standalone:true,
  templateUrl: 'number-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatInput
  ],
  styleUrls: ['./dialog.component.css']
})
export class NumberDialogComponent {
  value: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number) {
    this.value = data;
  }
}
