import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ReadDetailDialogComponent } from '@shared/dialogs/read-detail.dialog.component';
import { CustomerDiscount } from './customer-discount.model';
import { CustomerDiscountService } from './customer-discount.service';
import { CustomerDiscountSearch } from './customer-discount-search.model';
import {CustomerDiscountCreationUpdatingDialogComponent} from "./customer-discount-creation-updating-dialog.component";

@Component({
  templateUrl: 'customer-discount.component.html'
})
export class CustomerDiscountComponent {
  customerId: string;
  title = 'Customer Discounts Management';
  customerDiscounts = of([]);
  customerDiscountSearch: CustomerDiscountSearch;

  constructor(private dialog: MatDialog, private customerDiscountService: CustomerDiscountService) {
    this.resetSearch();
  }

  search(): void {
    this.customerDiscounts = this.customerDiscountService.search(this.customerDiscountSearch);
  }

  resetSearch(): void {
    this.customerDiscountSearch = {note: "", registrationDate: undefined};
  }

  create(): void {
   this.dialog.open(CustomerDiscountCreationUpdatingDialogComponent);
  }

  read(customerDiscount: CustomerDiscount): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Customer Discount Details',
        object: this.customerDiscountService.read(customerDiscount.userMobile)
      }
    });
  }

  update(customerDiscount: CustomerDiscount): void {
   this.customerDiscountService.read(customerDiscount.userMobile)
     .subscribe(fullCustomerDiscount => this.dialog.open(CustomerDiscountCreationUpdatingDialogComponent, { data: fullCustomerDiscount }));
  }

  delete($event: any) {

  }
}

