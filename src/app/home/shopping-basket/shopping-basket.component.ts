import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ShoppingBasketService} from './shopping-basket.service';
import {AuthService} from "@core/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SharedArticleService} from "../shared/services/shared.article.service";
import {NumberDialogComponent} from "@shared/dialogs/number-dialog.component";
import {CustomerPointsConstants} from "@shared/models/customer-points.model";
import * as uuid from 'uuid';
import {ShoppingState} from "../../shop/cashier-opened/shopping-cart/shopping-state.model";
import {Shopping} from "@shared/models/shopping.model";
import {OnlineOrder} from "@shared/models/online-order.model";
import {Ticket} from "../../shop/cashier-opened/tickets/tickets.models";
import {OnlineOrderState} from "@shared/models/online-order-state";


@Component({
  selector: 'app-shopping-basket',
  styleUrls: ['shopping-basket.component.css'],
  templateUrl: 'shopping-basket.component.html'
})
export class ShoppingBasketComponent {
  barcode: string;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'actions'];
  shoppingBasket: Shopping[] = [];
  totalShoppingBasket = 0;
  phone = 0;

  constructor(private shoppingBasketService: ShoppingBasketService, private sharedArticleService : SharedArticleService,
              private authService: AuthService, private dialog: MatDialog) {
    this.shoppingBasket = this.shoppingBasketService.loadShoppingBasketContent();
    this.synchronizeShoppingBasket();
  }

  synchronizeShoppingBasket(): void {
    this.shoppingBasket = [...this.shoppingBasket];
    let total = 0;
    for (const shopping of this.shoppingBasket) {
      total = total + (shopping.retailPrice * shopping.amount);
    }
    this.totalShoppingBasket = Math.round(total * 100) / 100;
    this.shoppingBasketService.saveShoppingBasketContent(this.shoppingBasket);
  }

  addDescription(description: string): void {
    this.sharedArticleService
      .read(description)
      .subscribe(newShoppings =>
        newShoppings.map(newShopping => {
          newShopping.state = ShoppingState.NOT_COMMITTED;
          this.shoppingBasket.push(newShopping);
          this.synchronizeShoppingBasket();
        }));
  }

  incrementAmount(shopping: Shopping): void {
    shopping.amount++;
    shopping.updateTotal();
    this.synchronizeShoppingBasket();
  }

  decreaseAmount(shopping: Shopping): any {
    if (shopping.amount > 1) {
      shopping.amount--;
    }
    shopping.updateTotal();
    this.synchronizeShoppingBasket();
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingBasket.indexOf(shopping);
    if (index > -1) {
      this.shoppingBasket.splice(index, 1);
    }

    this.synchronizeShoppingBasket();
  }

  isEmpty(): boolean {
    return (!this.shoppingBasket || this.shoppingBasket.length === 0);
  }

  order(): void {
    this.shoppingBasketService.createTicket(this.shoppingBasket)
      .subscribe(response => this.treatResponse(response));
  }

  treatResponse(ticket: Ticket) {
    console.log(ticket);
    let onlineOrder: OnlineOrder = {ticket: ticket, reference: uuid.v4(), state: OnlineOrderState.PREPARING};
    this.shoppingBasketService.createOrder(onlineOrder).subscribe();
    this.shoppingBasketService.printTicket(ticket.id).subscribe();
    this.shoppingBasket = [];
    this.synchronizeShoppingBasket();
  }

  userIsLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  updateTotal(shopping: Shopping): void {
    if(!this.isDiscountPointsItem(shopping)) {
      this.dialog.open(NumberDialogComponent, {data: shopping.total})
        .afterClosed()
        .subscribe(result => {
          if (result) {
            shopping.total = result;
            if (shopping.total > (shopping.retailPrice * shopping.amount)) {
              shopping.total = shopping.retailPrice * shopping.amount;
            }
            if (shopping.total < 0) {
              shopping.total = 0;
            }
            shopping.updateDiscount();
            this.synchronizeShoppingBasket();
          }
        });
    }
  }
  isDiscountPointsItem(item: Shopping): boolean{
    return item.barcode == CustomerPointsConstants.BARCODE;
  }
}
