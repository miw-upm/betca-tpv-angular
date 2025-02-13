import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatIcon, MatDialogActions, MatDialogClose, MatButton],
    templateUrl: 'cancel-yes-dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {
}
