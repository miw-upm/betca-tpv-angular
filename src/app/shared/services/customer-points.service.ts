import { Injectable } from '@angular/core';
import {AuthService} from "@core/auth.service";
import {CustomerPoints} from "../models/customer-points.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerPointsService {
  private customerPointsSubject: BehaviorSubject<CustomerPoints> = new BehaviorSubject<CustomerPoints>(null);
  private customerPoints: Observable<CustomerPoints> = this.customerPointsSubject.asObservable();
  constructor(private auth: AuthService) {
  }
  private setCurrentCustomerPoints(): void {
    this.customerPointsSubject.next(<CustomerPoints>{
      value: 1,
      lastDate: new Date(),
      user: this.auth.getUser()
    });
  }
  private checkAndSetCustomerPoints(): void {
    if(this.customerPoints == undefined) {
      this.setCurrentCustomerPoints();
    }
  }
  customerHasPoints(): Observable<boolean> {
    this.checkAndSetCustomerPoints();
    return this.customerPoints.pipe(
      map(customerPoints=>customerPoints.value > 0)
    );
  }
  getCustomerPoints(): Observable<CustomerPoints> {
    this.setCurrentCustomerPoints();
    return this.customerPoints;
  }
}
