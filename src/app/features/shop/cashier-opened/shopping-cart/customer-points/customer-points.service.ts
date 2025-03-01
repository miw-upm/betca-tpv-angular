import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { CustomerPoints, CustomerPointsConstants } from './customer-points.model';
import { HttpService } from '@core/services/http.service';
import { EndPoints } from '@core/end-points';
import { User } from '../user.models';

@Injectable({
    providedIn: 'root'
})
export class CustomerPointsService {
    private customerPointsSubject = new BehaviorSubject<CustomerPoints>(null);
    customerPoints$ = this.customerPointsSubject.asObservable();

    constructor(private auth: AuthService, private httpService: HttpService) {
        this.setCurrentCustomerPoints();
    }

    setCurrentCustomerPoints(): void {
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

    updateCustomerPoints(targetUser: User, updatePayload: { points: number }): Observable<CustomerPoints> {
        const currentPoints = this.customerPointsSubject.getValue();
        const newTotal = (currentPoints ? currentPoints.value : 0) + updatePayload.points;

        const payload = {
            value: newTotal,
            user: {
                mobile: targetUser.mobile
            }
        };
        return this.httpService.put(`${EndPoints.CUSTOMER_POINTS}/${targetUser.mobile}`, payload)
            .pipe(
                map((response: any) => {
                    const updatedPoints: CustomerPoints = {
                        value: response.value,
                        lastDate: new Date(),
                        user: targetUser
                    };
                    this.customerPointsSubject.next(updatedPoints);
                    return updatedPoints;
                }),
                switchMap(() => this.searchCustomerPointsByMobile(targetUser.mobile))
            );
    }
}
