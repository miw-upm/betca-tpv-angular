import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatLabel} from '@angular/material/form-field';
import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';
import {MatButton} from '@angular/material/button';

@Component({
  standalone:true,
  templateUrl: 'read-detail.dialog.component.html',
  imports: [
    MatDialogContent,
    AsyncPipe,
    MatLabel,
    UppercaseWords,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgIf,
    MatDialogTitle
  ],
  styleUrls: ['./dialog.component.css']
})

export class ReadDetailDialogComponent {
  title: string;
  object: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.object = data.object;
  }

  labels(object): string[] {
    return Object.getOwnPropertyNames(object);
  }
}
