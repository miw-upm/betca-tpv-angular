import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  standalone:true,
  templateUrl: 'cancel-yes-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {
}
