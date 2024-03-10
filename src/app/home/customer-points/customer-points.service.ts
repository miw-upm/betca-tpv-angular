import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {AuthService} from "@core/auth.service";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root'
})
export class CustomerPointsService {
  private customerPointsSubject: BehaviorSubject<CustomerPoints> = new BehaviorSubject<CustomerPoints>(null);
  private customerPoints: Observable<CustomerPoints> = this.customerPointsSubject.asObservable();
  constructor(private auth: AuthService, private http: HttpService) {
  }
  private setCurrentCustomerPoints(): void {
    this.http
      .hideError()
      .get(EndPoints.CUSTOMER_POINTS+"/"+this.auth.getUser().mobile)
      .subscribe({
        next: data => this.customerPointsSubject.next(data),
        error: _ => this.customerPointsSubject.next(<CustomerPoints>{value:0})
      })
  }
  getCurrentCustomerPoints(): Observable<CustomerPoints> {
    this.setCurrentCustomerPoints();
    return this.customerPoints;
  }
}
