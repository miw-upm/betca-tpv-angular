import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
// import {Observable, of} from 'rxjs';

import {Voucher} from './voucher.model';
import {VouchersService} from './vouchers.service';

@Component({
  templateUrl: 'voucher-creation-dialog.component.html',
  styleUrls: ['voucher-dialog.component.css']
})

export class VoucherCreationDialogComponent {
  voucher: Voucher;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Voucher, private vouchersService: VouchersService, private dialog: MatDialog) {
    this.title = 'Create Voucher';
    this.voucher = data ? data : {
      reference: '',
      value: undefined,
      creationDate: new Date(),
      user: undefined
    };
  }

  // TODO: Add search-by-user input

  create(): void {
    this.vouchersService
      .create(this.voucher)
      .subscribe(() => this.dialog.closeAll());
  }

  // invalid(): boolean {
  //   return this.check(this.voucher.reference) || this.check(this.voucher.value) || this.check(this.voucher.user);
  // }

  // check(attr: string | number | any): boolean {
  //   return attr === undefined || null || attr === '';
  // }

}
