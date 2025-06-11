import { Injectable } from "@angular/core";
import { CustomerDiscount, CustomerDiscountDto } from "../models/customer-discount.model";
import { Observable} from "rxjs";
import { EndPoints } from "@core/end-points";
import { HttpService } from "@core/services/http.service";

@Injectable({ providedIn: "root" })
export class CustomerDiscountService {

    constructor(private httpService: HttpService) {
    }


    create(customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
        return this.httpService.post(EndPoints.CUSTOMER_DISCOUNT, customerDiscount);
    }

    findAll(): Observable<CustomerDiscountDto[]> {
        return this.httpService.get(EndPoints.CUSTOMER_DISCOUNT);
    }

    update(mobile: number, customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
        return this.httpService.put(`${EndPoints.CUSTOMER_DISCOUNT}/${mobile}`, customerDiscount)
    }

    delete(mobile: number): Observable<any> {
        return this.httpService.delete(`${EndPoints.CUSTOMER_DISCOUNT}/${mobile}`);
    }
}