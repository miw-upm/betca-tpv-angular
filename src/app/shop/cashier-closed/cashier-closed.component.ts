import {Component} from '@angular/core';

import {SharedCashierService} from '../shared/services/shared.cashier.service';
import {CashierLast} from '../shared/services/models/cashier-last.model';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'cashier-closed.component.html'
})
export class CashierClosedComponent {
  cashierLast: Observable<CashierLast>;

  constructor(private sharedCashierService: SharedCashierService) {
    this.cashierLast = this.sharedCashierService.readLast();
  }

}
