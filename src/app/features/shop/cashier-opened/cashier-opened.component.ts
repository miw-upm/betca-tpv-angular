import {Component} from '@angular/core';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

@Component({
    standalone: true,
    imports: [ShoppingCartComponent],
    templateUrl: 'cashier-opened.component.html',
    styleUrls: ['cashier-opened.component.css']
})
export class CashierOpenedComponent {

    constructor() {
    }

}
