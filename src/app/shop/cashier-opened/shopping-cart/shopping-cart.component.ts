import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';

import {ShoppingCartService} from './shopping-cart.service';
import {Shopping} from './shopping.model';
import {CheckOutDialogComponent} from './check-out-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ShoppingState} from './shopping-state.model';
import {NumberDialogComponent} from '@shared/dialogs/number-dialog.component';
import {AuthService} from "@core/auth.service";
import {CustomerPointsService} from "@shared/services/customer-points.service";
import {map} from "rxjs/operators";
import {CustomerPointsConstants} from "@shared/models/customer-points.model";

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['shopping-cart.component.css'],
  templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  static SHOPPING_CART_NUM = 4;

  barcode: string;
  barcodes: Observable<number[]> = of([]);

  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'actions'];
  shoppingCart: Shopping[] = [];
  indexShoppingCart = 0;
  totalShoppingCart = 0;
  usePoints: boolean = false;
  private shoppingCartList: Array<Array<Shopping>> = [];
  @ViewChild('code', {static: true}) private elementRef: ElementRef;

  constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
              private authService: AuthService, private customerPointsService: CustomerPointsService) {
    for (let i = 0; i < ShoppingCartComponent.SHOPPING_CART_NUM; i++) {
      this.shoppingCartList.push([]);
    }
    this.shoppingCart = [];
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
    this.shoppingCart = [];
    this.synchronizeShoppingCart();
  }

  synchronizeShoppingCart(): void {
    this.shoppingCart = [...this.shoppingCart];
    let total = 0;
    for (const shopping of this.shoppingCart) {
      total = total + shopping.total;
    }
    this.totalShoppingCart = Math.round(total * 100) / 100;
  }

  addBarcode(barcode): void {
    this.shoppingCartService
      .read(barcode)
      .subscribe(newShopping => {
        this.shoppingCart.push(newShopping);
        this.synchronizeShoppingCart();
      });
    this.elementRef.nativeElement.focus();
  }

  incrementAmount(shopping: Shopping): void {
    shopping.amount++;
    if (shopping.amount === 0) {
      shopping.amount++;
    }
    shopping.updateTotal();
    this.synchronizeShoppingCart();
  }

  decreaseAmount(shopping: Shopping): any {
    shopping.amount--;
    if (shopping.amount === 0) {
      shopping.amount--;
      shopping.state = ShoppingState.COMMITTED;
    }
    shopping.updateTotal();
    this.synchronizeShoppingCart();
  }

  updateDiscount(shopping: Shopping): void {
    if(!this.isDiscountPointsItem(shopping)){
      this.dialog.open(NumberDialogComponent, {data: shopping.discount})
        .afterClosed()
        .subscribe(result => {
          if (result) {
            shopping.discount = result;
            if (shopping.discount < 0) {
              shopping.discount = 0;
            }
            if (shopping.discount > 100) {
              shopping.discount = 100;
            }
            shopping.updateTotal();
            this.synchronizeShoppingCart();
          }
        });
    }
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
            this.synchronizeShoppingCart();
          }
        });
    }
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingCart.indexOf(shopping);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    if(this.isOnlyDiscountPointShoppingInCart()){
      this.clearCurrentShoppingCart();
    }
    this.synchronizeShoppingCart();
  }


  checkboxState(state: ShoppingState): boolean {
    return state === ShoppingState.COMMITTED;
  }

  changeCommitted(shopping: Shopping): void {
    if (shopping.state === ShoppingState.COMMITTED) {
      shopping.state = ShoppingState.NOT_COMMITTED;
    } else {
      shopping.state = ShoppingState.COMMITTED;
    }
  }

  isEmpty(): boolean {
    return (!this.shoppingCart || this.shoppingCart.length === 0);
  }

  exchangeShoppingCart(): void {
    this.shoppingCartList[this.indexShoppingCart++] = this.shoppingCart;
    this.indexShoppingCart %= ShoppingCartComponent.SHOPPING_CART_NUM;
    this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
    this.synchronizeShoppingCart();
  }

  checkOut(): void {
    this.dialog.open(CheckOutDialogComponent, {data: this.shoppingCart}).afterClosed().subscribe(
      result => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }

  createBudget(): void {
    // TODO create budget
  }

  addDiscount(mobile): void {
    // TODO add discount
  }

  addOffer(offer): void {
    // TODO add offer
  }
  userIsLogged(): boolean {
    return this.authService.isAuthenticated();
  }
  canUsePoints(): Observable<boolean> {
    return this.customerPointsService.customerHasPoints()
      .pipe(
        map(hasPoints => hasPoints && !this.isEmpty())
      );
  }
  usePointsChanged(): void {
    this.removePointDiscountArticle();
    if(this.usePoints){
      this.shoppingCartService.getPointsDiscountShopping()
        .subscribe(
          shopping => {
            this.shoppingCart.push(shopping);
            this.synchronizeShoppingCart();
          }
        )
    }
  }
  private removePointDiscountArticle(): void {
    this.shoppingCart = this.shoppingCart.filter(x=>x.barcode != CustomerPointsConstants.BARCODE);
    this.shoppingCartList = this.shoppingCartList.map(shoppingCart=> shoppingCart.filter(x=>x.barcode != CustomerPointsConstants.BARCODE));
    this.synchronizeShoppingCart();
  }
  isDiscountPointsItem(item: Shopping): boolean{
    return item.barcode == CustomerPointsConstants.BARCODE;
  }

  private isOnlyDiscountPointShoppingInCart() {
    return this.shoppingCart.length == 1 && this.shoppingCart[0].barcode == CustomerPointsConstants.BARCODE;
  }

  private clearCurrentShoppingCart() {
    this.shoppingCart = [];
    this.usePoints = false;
  }
}
