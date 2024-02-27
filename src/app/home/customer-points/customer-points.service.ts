import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {AuthService} from "@core/auth.service";
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
  getCurrentCustomerPoints(): Observable<CustomerPoints> {
    this.setCurrentCustomerPoints();
    return this.customerPoints;
  }
}
