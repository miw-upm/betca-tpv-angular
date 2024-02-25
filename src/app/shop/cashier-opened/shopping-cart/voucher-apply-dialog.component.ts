import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {SharedVoucherService} from '../../shared/services/shared-voucher.service';
import {Voucher} from '../../shared/services/models/voucher.model';

@Component({
  templateUrl: 'voucher-apply-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})

export class VoucherApplyDialogComponent {
  voucher: Voucher;
  title: string;

  constructor(private sharedVoucherService: SharedVoucherService, private dialogRef: MatDialogRef<VoucherApplyDialogComponent>) {
    this.title = 'Apply Voucher';
    this.voucher = {
      value: undefined,
      reference: undefined
    };
  }

  apply(): void {
    this.sharedVoucherService.consumeVoucher(this.voucher.reference)
      .subscribe((voucher) => {
        this.dialogRef.close(voucher);
      });
  }

}
