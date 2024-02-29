import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { CustomerDiscountService } from './customer-discount.service';
import { CustomerDiscount } from './customer-discount.model';
import { User } from "@core/user.model";
@Component({
  templateUrl: 'customer-discount-creation-updating-dialog.component.html',
  styleUrls: ['customer-discount-creation-updating-dialog.component.css']
})
export class CustomerDiscountCreationUpdatingDialogComponent {
  customerDiscount: CustomerDiscount;
  title: string;
  oldCustomerDiscount: CustomerDiscount | {
    note: undefined;
    registrationDate: undefined;
    discount: undefined;
    minimumPurchase: undefined;
    userMobile: undefined
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: CustomerDiscount, private customerDiscountService: CustomerDiscountService, private dialog: MatDialog) {
    this.title = data ? 'Update Customer Discount' : 'Create Customer Discount';
    this.customerDiscount = data ? data : { userMobile: undefined, note: undefined, registrationDate: undefined, discount: undefined, minimumPurchase: undefined };
    this.oldCustomerDiscount = data ? data : { userMobile: undefined, note: undefined, registrationDate: undefined, discount: undefined, minimumPurchase: undefined };
  }

  isCreate(): boolean {
    return this.oldCustomerDiscount === undefined;
  }

  create(): void {
    this.customerDiscountService
      .create(this.customerDiscount)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.customerDiscountService
      .update(this.oldCustomerDiscount.userMobile, this.customerDiscount)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.customerDiscount.userMobile) || this.check(this.customerDiscount.note) || this.check(this.customerDiscount.discount) || this.check(this.customerDiscount.minimumPurchase);
  }

  check(attr: string | number | Date): boolean {
    return attr === undefined || attr === null || attr === '';
  }
}

