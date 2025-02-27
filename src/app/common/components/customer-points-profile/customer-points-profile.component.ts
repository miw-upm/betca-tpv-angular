import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPointsService } from '../../../features/shop/cashier-opened/shopping-cart/customer-points/customer-points.service';
import { CustomerPoints } from '../../../features/shop/cashier-opened/shopping-cart/customer-points/customer-points.model';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

@Component({
    selector: 'customer-points-profile',
    standalone: true,
    imports: [CommonModule, MatDividerModule],
    templateUrl: './customer-points-profile.component.html',
    styleUrls: ['./customer-points-profile.component.css']
})
export class CustomerPointsProfileComponent implements OnInit, OnDestroy {
    points: number = 0;
    lastUpdated: Date | null = null;
    private subscription: Subscription;

    constructor(protected customerPointsService: CustomerPointsService) {}

    ngOnInit(): void {
        const current = this.customerPointsService.getCurrentPoints();
        if (current && current.user && current.user.mobile) {
            this.customerPointsService.searchCustomerPointsByMobile(current.user.mobile)
                .subscribe();
        }

        this.subscription = this.customerPointsService.customerPoints$.subscribe((cp: CustomerPoints) => {
            if (cp) {
                this.points = cp.value;
                this.lastUpdated = cp.lastDate;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
