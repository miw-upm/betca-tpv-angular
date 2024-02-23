import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'voucher-read-detail.dialog.component.html',
  styleUrls: ['./voucher-dialog.component.css']
})

export class VoucherReadDetailDialogComponent {
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
