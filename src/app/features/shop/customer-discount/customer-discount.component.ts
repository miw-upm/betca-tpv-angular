import { Component } from '@angular/core';
import { CustomerDiscount, FormattedCustomerDiscount } from "./models/customer-discount.model"
import { CrudComponent } from "@common/components/crud.component";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDiscountCreateComponent } from './components/customer-discount-create/customer-discount-create.component';
import { CustomerDiscountService } from './customer-discount-service/customer-discount-service';
@Component({
    selector: 'app-customer-discount',
    imports: [
        CrudComponent,
        CommonModule
    ],
    templateUrl: './customer-discount.component.html',
    styleUrl: './customer-discount.component.css',
    standalone: true
})
export class CustomerDiscountComponent {
    formattedcustomerDiscounts: Observable<FormattedCustomerDiscount[]>;
    customerDiscounts: Observable<CustomerDiscount[]> = of([{
        user: { mobile: 666, token: '1' },
        note: 'VIP customer',
        registrationDate: new Date(),
        discount: 10,
        minimumPurchase: 50
    }]);
    selectedDiscount: CustomerDiscount = {
        user: { mobile: 666, token: '1' },
        note: 'VIP customer',
        registrationDate: new Date(),
        discount: 10,
        minimumPurchase: 50
    };

    formattedCustomerDiscounts = this.customerDiscounts.pipe(map(items => (items ? items.map(item => ({
        mobile: item.user.mobile,
        note: item.note,
        registrationDate: item.registrationDate,
        discount: item.discount,
        minimumPurchase: item.minimumPurchase
    })) : [])));
    title = "Customer Discounts";
    constructor(private dialog: MatDialog, private customerDiscountService: CustomerDiscountService) {
    }

    create() {
      this.dialog.open(CustomerDiscountCreateComponent);
    }

    read($event: any) {
        throw new Error("Method not implemented.");
    }

    update($event: any) {
        throw new Error("Method not implemented.");
    }
}