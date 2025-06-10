import { Injectable } from "@angular/core";
import { CustomerDiscount, CustomerDiscountDto } from "../models/customer-discount.model";
import { Observable, of } from "rxjs";
import { EndPoints } from "@core/end-points";
import { HttpService } from "@core/services/http.service";

@Injectable({ providedIn: "root" })
export class CustomerDiscountService {
    private mockCustomerDiscount: CustomerDiscount[];

    constructor(private httpService: HttpService) {
        this.mockData();
    }

    mockData() {
        this.mockCustomerDiscount = [
            {
                user: { mobile: 1, token: '1' },
                note: 'VIP customer',
                registrationDate: new Date(),
                discount: 10,
                minimumPurchase: 50
            },
            {
                user: { mobile: 1, token: '1' },
                note: 'VIP customer',
                registrationDate: new Date(),
                discount: 10,
                minimumPurchase: 50
            }]
    }


    create(customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
        return this.httpService.post(EndPoints.CUSTOMER_DISCOUNT, customerDiscount);
    }

    findAll(): Observable<CustomerDiscountDto[]> {
        return this.httpService.get(EndPoints.CUSTOMER_DISCOUNT);
    }
}