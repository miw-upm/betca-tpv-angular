import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {VoucherCreation} from './voucher-creation.model';
import {VouchersService} from './vouchers.service';

@Component({
  templateUrl: 'voucher-creation-dialog.component.html',
  styleUrls: ['voucher-dialog.component.css']
})

export class VoucherCreationDialogComponent {
  voucher: VoucherCreation;
  title: string;

  constructor(private vouchersService: VouchersService, private dialog: MatDialog) {
    this.title = 'Create Voucher';
    this.voucher = {
      value: undefined
    };
  }

  create(): void {
    this.vouchersService
      .create(this.voucher)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.voucher.value);
  }

  check(attr: string | number): boolean {
    return attr === undefined || null || attr === '';
  }

}
