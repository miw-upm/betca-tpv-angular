import { Component } from '@angular/core';
import { CustomerDiscount, CustomerDiscountDto } from "./models/customer-discount.model"
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
    customerDiscounts: Observable<CustomerDiscountDto[]>;
    title = "Customer Discounts";


    constructor(private dialog: MatDialog, private customerDiscountService: CustomerDiscountService) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll(): void {
        this.customerDiscounts = this.customerDiscountService.findAll() ?? of([]);
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