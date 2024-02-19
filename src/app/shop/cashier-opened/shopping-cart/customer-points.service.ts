import { Injectable } from '@angular/core';
import {AuthService} from "@core/auth.service";
import {CustomerPoints, CustomerPointsConstants} from "./customer-points.model";
import {Observable, of} from "rxjs";
import {Shopping} from "./shopping.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerPointsService {
  customerPoints: CustomerPoints;
  constructor(private auth: AuthService) {

  }
  private setCurrentCustomerPoints(): void {
    if(this.auth.isAuthenticated()){
      this.customerPoints = <CustomerPoints>{
        value: 1,
        lastDate: new Date(),
        user: {mobile: Number(this.auth.getUser().mobile)}
      };
    }
  }
  customerHasPoints(): Observable<boolean> {
    return of(this.customerPoints.value > 0);
  }
  refreshCustomerPoints(): void {
    this.setCurrentCustomerPoints();
  }
  getPointDiscountShopping(): Observable<Shopping> {
    return of(new Shopping(CustomerPointsConstants.BARCODE, "POINTS DISCOUNT", -12));
  }
}
