import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatIcon, MatDialogActions, MatDialogClose, MatButton],
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    title: string = "Desea cerrar?"
}
