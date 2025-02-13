import {Component} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Observable} from 'rxjs';

import {SharedCashierService} from '../shared/services/shared.cashier.service';
import {CashierLast} from '../shared/models/cashier-last.model';

@Component({
    standalone: true,
    imports: [MatCard, MatCardTitle, MatIcon, MatCardContent, AsyncPipe, DecimalPipe, DatePipe],
    templateUrl: 'cashier-closed.component.html'
})
export class CashierClosedComponent {
    cashierLast: Observable<CashierLast>;

    constructor(private readonly sharedCashierService: SharedCashierService) {
        this.cashierLast = this.sharedCashierService.readLast();
    }

}
