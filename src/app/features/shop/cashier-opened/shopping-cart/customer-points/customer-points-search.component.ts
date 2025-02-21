import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerPointsService } from './customer-points.service';
import { CustomerPoints } from './customer-points.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputData } from '@common/components/input-data.component';

@Component({
    selector: 'customer-points-search',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, InputData],
    templateUrl: './customer-points-search.component.html',
    styleUrls: ['./customer-points-search.component.css']
})
export class CustomerPointsSearchComponent implements OnInit {
    points: CustomerPoints;

    @Output() usePoints = new EventEmitter<CustomerPoints>();

    constructor(private customerPointsService: CustomerPointsService) { }

    ngOnInit(): void {
        this.customerPointsService.customerPoints$.subscribe(pts => {
            this.points = pts;
        });
    }

    searchPoints(value: string): void {
        const mobile = Number(value);
        if (isNaN(mobile) || mobile <= 0) {
            console.error('Invalid phone number');
            return;
        }
        this.customerPointsService.searchCustomerPointsByMobile(mobile).subscribe(pts => {
            this.points = pts;
        });
    }

    onUsePoints(): void {
        if (this.points) {
            this.usePoints.emit(this.points);
        }
    }
}
