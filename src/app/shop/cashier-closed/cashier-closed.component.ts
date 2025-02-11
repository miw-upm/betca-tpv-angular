import {Component} from '@angular/core';

import {SharedCashierService} from '../shared/services/shared.cashier.service';
import {CashierLast} from '../shared/services/models/cashier-last.model';
import {Observable} from 'rxjs';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';

@Component({
  standalone:true,
  imports: [
    MatCard,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    AsyncPipe,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: 'cashier-closed.component.html'
})
export class CashierClosedComponent {
  cashierLast: Observable<CashierLast>;

  constructor(private readonly sharedCashierService: SharedCashierService) {
    this.cashierLast = this.sharedCashierService.readLast();
  }

}
