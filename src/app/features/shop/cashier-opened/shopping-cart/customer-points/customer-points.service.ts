import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { CustomerPoints, CustomerPointsConstants } from './customer-points.model';
import { Shopping } from '../shopping.model';
import { HttpService } from '@core/services/http.service';
import { EndPoints } from '@core/end-points';

@Injectable({
    providedIn: 'root'
})
export class CustomerPointsService {
    private customerPointsSubject = new BehaviorSubject<CustomerPoints>(null);
    customerPoints$ = this.customerPointsSubject.asObservable();

    constructor(private auth: AuthService, private httpService: HttpService) {
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
        return this.httpService
            .get(`${EndPoints.CUSTOMER_POINTS}/${mobile}`)
            .pipe(
                map((response: any) => {
                    const points: CustomerPoints = {
                        value: response.value,
                        lastDate: new Date(response.lastDate),
                        user: { mobile },
                    };
                    this.customerPointsSubject.next(points);
                    return points;
                })
            );
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

    finalizeCheckoutPointsUpdate(user: any, pointsUsed: number, totalPurchase: number): Observable<CustomerPoints> {
        const targetUser = user;
        const currentPoints = (this.customerPointsSubject.getValue() &&
            this.customerPointsSubject.getValue().user.mobile === targetUser.mobile)
            ? this.customerPointsSubject.getValue().value
            : 0;
        const rewardedPoints = Math.floor(totalPurchase / 10);
        const newValue = currentPoints - pointsUsed + rewardedPoints;

        const updatePayload = {
            value: newValue,
            user: { mobile: targetUser.mobile }
        };

        return this.httpService.put(`${EndPoints.CUSTOMER_POINTS}/${targetUser.mobile}`, updatePayload)
            .pipe(
                map((response: any) => {
                    const updatedPoints: CustomerPoints = {
                        value: response.value,
                        lastDate: new Date(response.lastDate),
                        user: targetUser
                    };
                    this.customerPointsSubject.next(updatedPoints);
                    return updatedPoints;
                }),
                switchMap(() => this.searchCustomerPointsByMobile(targetUser.mobile))
            );
    }
}
