import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { CustomerPoints, CustomerPointsConstants } from './customer-points.model';
import { Shopping } from './shopping.model';

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
                value: 10,
                lastDate: new Date(),
                user: { mobile: Number(this.auth.getUser().mobile) }
            };
            this.customerPointsSubject.next(points);
        }
    }

    refreshCustomerPoints(): void {
        this.setCurrentCustomerPoints();
    }

    getCurrentPoints(): CustomerPoints {
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
