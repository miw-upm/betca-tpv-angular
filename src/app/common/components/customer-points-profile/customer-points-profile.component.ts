import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPointsService } from '../../../features/shop/cashier-opened/shopping-cart/customer-points/customer-points.service';
import { CustomerPoints } from '../../../features/shop/cashier-opened/shopping-cart/customer-points/customer-points.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'customer-points-profile',
    standalone: true,
    imports: [CommonModule, MatDividerModule],
    templateUrl: './customer-points-profile.component.html',
    styleUrls: ['./customer-points-profile.component.css']
})
export class CustomerPointsProfileComponent implements OnInit {
    points: number = 33;
    lastUpdated: Date | null = new Date('2025-01-02T10:00:00Z');

    constructor(private customerPointsService: CustomerPointsService) {}

    ngOnInit(): void {

        const cp: CustomerPoints = this.customerPointsService.getCurrentPoints();
        if (cp) {
            this.points = cp.value;
            this.lastUpdated = cp.lastDate;
        }
    }
}
