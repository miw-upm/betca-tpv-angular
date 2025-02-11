import {Component} from '@angular/core';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

@Component({
  templateUrl: 'cashier-opened.component.html',
  imports: [
    ShoppingCartComponent
  ],
  styleUrls: ['cashier-opened.component.css']
})
export class CashierOpenedComponent {

  constructor() {
  }

}
