import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { CustomerPoints, CustomerPointsConstants } from './customer-points.model';
import { Shopping } from '../shopping.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerPointsService {
    private customerPointsSubject = new BehaviorSubject<CustomerPoints>(null);
    customerPoints$ = this.customerPointsSubject.asObservable();

    constructor(private auth: AuthService) {
        this.setCurrentCustomerPoints();
    }

    private setCurrentCustomerPoints(): void {
        if (this.auth.isAuthenticated()) {
            const points: CustomerPoints = {
                value: 0,
                lastDate: new Date(),
                user: this.auth.getUser()
            };
            this.customerPointsSubject.next(points);
        }
    }

    searchCustomerPointsByMobile(mobile: number): Observable<CustomerPoints> {
        const client = { mobile, name: 'Test' };
        const points: CustomerPoints = {
            value: 20,
            lastDate: new Date(),
            user: this.auth.getUser(),
        };
        this.customerPointsSubject.next(points);
        return of(points);
    }

    getCurrentPoints(): CustomerPoints {
        if (this.auth.isAuthenticated()) {
            const authUser = this.auth.getUser();
            const current = this.customerPointsSubject.getValue();
            if (!current || !current.user || current.user.mobile !== authUser.mobile) {
                this.setCurrentCustomerPoints();
            }
        }
        return this.customerPointsSubject.getValue();
    }

    customerHasPoints(): Observable<boolean> {
        return this.customerPoints$.pipe(
            map(points => points ? points.value > 0 : false)
        );
    }

    getPointDiscountShopping(pointsToUse: number): Observable<Shopping> {
        const discountValue = -pointsToUse;
        return of(new Shopping(CustomerPointsConstants.DISCOUNT_POINTS_BARCODE, "Points Discount", discountValue));
    }
}
