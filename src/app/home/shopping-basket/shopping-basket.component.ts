import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ShoppingBasketService} from './shopping-basket.service';
import {AuthService} from "@core/auth.service";
import {Shopping} from "./shopping.model";
import {MatDialog} from "@angular/material/dialog";
import {PhoneRequestDialogComponent} from "./phone-request-dialog.component";

@Component({
  selector: 'app-shopping-basket',
  styleUrls: ['shopping-basket.component.css'],
  templateUrl: 'shopping-basket.component.html'
})
export class ShoppingBasketComponent implements OnInit {
  barcode: string;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'actions'];
  shoppingBasket: Shopping[] = [];
  totalShoppingBasket = 0;
  phone = 0;
  @ViewChild('code', {static: true}) private elementRef: ElementRef;

  private mockShopping: Shopping[] = [
    { amount: 2, article: {barcode: "111111", description: "Primer producto", retailPrice: 10}},
    { amount: 1, article: {barcode: "222222", description: "Segundo producto", retailPrice: 20}},
    { amount: 5, article: {barcode: "333333", description: "Tercer producto", retailPrice: 30}}
  ];

  constructor(private shoppingBasketService: ShoppingBasketService,
              private authService: AuthService, private dialog: MatDialog) {
    this.shoppingBasket = [];
    this.shoppingBasket = [...this.shoppingBasket, ...this.mockShopping];
    this.synchronizeShoppingBasket();
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
    this.shoppingBasket = [];
    this.synchronizeShoppingBasket();
  }

  synchronizeShoppingBasket(): void {
    this.shoppingBasket = [...this.shoppingBasket];
    let total = 0;
    for (const shopping of this.shoppingBasket) {
      total = total + (shopping.article.retailPrice * shopping.amount);
    }
    this.totalShoppingBasket = Math.round(total * 100) / 100;
  }

  addDescription(description): void {
    this.shoppingBasketService
      .read(description)
      .subscribe(newShopping => {
        this.shoppingBasket.push(newShopping);
        this.synchronizeShoppingBasket();
      });
    this.elementRef.nativeElement.focus();
  }

  incrementAmount(shopping: Shopping): void {
    shopping.amount++;
    this.synchronizeShoppingBasket();
  }

  decreaseAmount(shopping: Shopping): any {
    if (shopping.amount > 0) {
      shopping.amount--;
    }
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
    if(this.userIsLogged()) {
      // TODO crear una orden y demás proceso
    }
    else {
      this.dialog.open(PhoneRequestDialogComponent)
        .afterClosed()
        .subscribe(response => console.log(response)); // TODO trabajar con el telefono
    }
  }

  userIsLogged(): boolean {
    return this.authService.isAuthenticated();
  }
}
