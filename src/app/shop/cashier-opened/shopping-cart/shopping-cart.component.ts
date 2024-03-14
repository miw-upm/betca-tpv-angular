import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';

import {ShoppingCartService} from './shopping-cart.service';
import {Shopping} from './shopping.model';
import {CheckOutDialogComponent} from './check-out-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ShoppingState} from './shopping-state.model';
import {NumberDialogComponent} from '@shared/dialogs/number-dialog.component';
import {CustomerPointsConstants} from "@shared/models/customer-points.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WarningMessages} from "./WarningMessages";
import {CheckOutDialogDataModel} from "./check-out-dialog-data.model";
import {Budget} from "./budgets.model";


@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['shopping-cart.component.css'],
  templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  static SHOPPING_CART_NUM = 4;

  barcode: string;
  barcodes: Observable<number[]> = of([]);
  budget: Budget;

  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'actions'];
  shoppingCart: Shopping[] = [];
  indexShoppingCart = 0;
  totalShoppingCart = 0;
  private shoppingCartList: Array<Array<Shopping>> = [];
  @ViewChild('code', {static: true}) private elementRef: ElementRef;
  @ViewChild('customerPointsMobile') private customerPointsRef: ElementRef;

  constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
              private snackBar: MatSnackBar) {
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
    if(this.shoppingCartHasOnlyDiscountPointsShopping()){
      this.removeCustomerPointsDiscount();
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
    this.dialog.open(CheckOutDialogComponent, {data: <CheckOutDialogDataModel>{
        shoppingCart: this.shoppingCart,
        mobile: this.getMobileIfUsedDiscount()
      }}).afterClosed().subscribe(
      result => {
        if (result) {
          this.ngOnInit();
        }
      }
    );
  }

  createBudget(): void {
    this.budget = {reference: null, creationDate: null, shoppingList: this.shoppingCart};
    this.shoppingCartService.createBudgetAndPrintReceipt(this.budget)
      .subscribe(() => {
        this.ngOnInit()
      })
  }

  addBudget(reference: string): void {
    this.shoppingCartService.readBudget(reference)
      .subscribe(shoppingInBudget => {
        shoppingInBudget.forEach(shopping => {
          this.addShoppingWithUpdatePrice(shopping);
        })
      });
  }

  addShoppingWithUpdatePrice(shopping: Shopping): void {
    this.shoppingCartService
      .read(shopping.barcode)
      .subscribe(newShopping => {
        shopping.total = shopping.retailPrice * shopping.amount * (1 - shopping.discount / 100);
        if (newShopping.total > shopping.total) {
          newShopping.total = shopping.total;
          newShopping.updateDiscount();
        }
        this.shoppingCart.push(newShopping);
        this.synchronizeShoppingCart();
      });
  }

  addDiscount(mobile): void {
    // TODO add discount
  }

  addOffer(offer): void {
    // TODO add offer
  }
  addCustomerPointsDiscount(mobileNumber: string): void {
    if(!this.isEmpty()){
      this.shoppingCartService.getPointsDiscountShoppingForUser(mobileNumber, this.totalShoppingCart)
        .subscribe({
            next: discountShopping => this.updateCustomerPointsDiscountArticle(discountShopping),
            complete: () => this.synchronizeShoppingCart()
          }
        );
    } else {
      this.snackBar.open(WarningMessages.SHOPPING_CART_SHOULD_HAS_AT_LEAST_ONE_ITEM, 'Warning', {duration: 5000});
    }
  }
  updateCustomerPointsDiscountArticle(discountShopping: Shopping): void {
    this.removeCustomerPointsDiscount();
    this.shoppingCart.push(discountShopping);
    this.synchronizeShoppingCart();
  }
  private removeCustomerPointsDiscount(): void {
    this.shoppingCart = this.shoppingCart.filter(x=>x.barcode != CustomerPointsConstants.BARCODE);
  }
  isDiscountPointsItem(item: Shopping): boolean{
    return item.barcode == CustomerPointsConstants.BARCODE;
  }

  private shoppingCartHasOnlyDiscountPointsShopping() {
    return this.shoppingCart.length == 1 && this.shoppingCartHasDiscountPointsShopping();
  }
  private shoppingCartHasDiscountPointsShopping(): boolean{
    return this.shoppingCart.filter(x=>x.barcode == CustomerPointsConstants.BARCODE).length > 0;
  }
  private getMobileIfUsedDiscount():string {
    if(this.shoppingCartHasDiscountPointsShopping()){
      return this.customerPointsRef.nativeElement.value;
    }
    return null;
  }
}
