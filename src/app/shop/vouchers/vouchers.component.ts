import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

import {Voucher} from './voucher.model';
import {VouchersService} from './vouchers.service';
import {VouchersSearch} from './vouchers-search.model';
import {VoucherReadDetailDialogComponent} from './voucher-read-detail.dialog.component';
//import {VoucherCreationDialogComponent} from './voucher-creation-dialog.component';

@Component({
  templateUrl: 'vouchers.component.html'
})
export class VouchersComponent {
  vouchersSearch: VouchersSearch;
  title = 'Vouchers management';
  vouchers = of([]);

  constructor(private dialog: MatDialog, private vouchersService: VouchersService) {
    this.resetSearch();
  }

  search(): void {
    this.vouchers = this.vouchersService.search(this.vouchersSearch);
  }

  resetSearch(): void {
    this.vouchersSearch = {};
  }

  // create(): void {
  //   this.dialog
  //     .open(VoucherCreationUpdatingDialogComponent)
  //     .afterClosed()
  //     .subscribe(() => this.search());
  // }

  read(voucher: Voucher): void {
    this.dialog.open(VoucherReadDetailDialogComponent, {
      data: {
        title: 'Voucher Details',
        object: this.vouchersService.read(voucher.reference)
      }
    });
  }
}
