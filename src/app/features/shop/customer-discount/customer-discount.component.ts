import { Component } from '@angular/core';
import { CustomerDiscountDto } from "./models/customer-discount.model"
import { CrudComponent } from "@common/components/crud.component";
import { Observable, of } from "rxjs";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDiscountCreateComponent } from './components/customer-discount-create/customer-discount-create.component';
import { CustomerDiscountService } from './customer-discount-service/customer-discount-service';
import { CustomerDiscountUpdateComponent } from './components/customer-discount-update/customer-discount-update.component';
import { CustomerDiscountDeleteComponent } from './components/customer-discount-delete/customer-discount-delete.component';
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


    constructor(private readonly dialog: MatDialog, private readonly customerDiscountService: CustomerDiscountService) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll(): void {
        this.customerDiscounts = this.customerDiscountService.findAll() ?? of([]);
    }

    create() {
      const dialogLog = this.dialog.open(CustomerDiscountCreateComponent);
      dialogLog.afterClosed().subscribe(() => this.findAll());
    }

    read($event: any) {
        throw new Error("Method not implemented.");
    }

    update(customerDiscountDto: CustomerDiscountDto) {
        const dialogLog = this.dialog.open(CustomerDiscountUpdateComponent, {data: customerDiscountDto});
        dialogLog.afterClosed().subscribe(() => this.findAll());
    }

    delete(customerDiscountDto: CustomerDiscountDto) {
        const dialogLog = this.dialog.open(CustomerDiscountDeleteComponent, {data: customerDiscountDto});
        dialogLog.afterClosed().subscribe(() => this.findAll());
    }
}