import { Component } from '@angular/core';
import { CustomerDiscount } from "./models/customer-discount.model"
import { CrudComponent } from "@common/components/crud.component";
import {Observable, of} from "rxjs";

@Component({
    selector: 'app-customer-discount',
    imports: [
        CrudComponent
    ],
    templateUrl: './customer-discount.component.html',
    styleUrl: './customer-discount.component.css',
    standalone: true
})
export class CustomerDiscountComponent {
    customerDiscount:Observable<CustomerDiscount[]> = of([{
        user: { name: 'John Doe', token: '1'},
        note: 'VIP customer',
        registrationDate: new Date(),
        discount: 10,
        minimumPurchase: 50
    }]);
    title = "Customer Discounts";

    create() {
        throw new Error("Method not implemented.");
    }

    read($event: any) {
        throw new Error("Method not implemented.");
    }

    update($event: any) {
        throw new Error("Method not implemented.");
    }
}