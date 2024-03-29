import {Component, Inject} from '@angular/core';

import {TicketCreation} from '@shared/models/ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GiftTicketCreation} from './gift-ticket-creation.model';
import {VoucherApplyDialogComponent} from './voucher-apply-dialog.component';
import {Salesperson} from "../../shared/services/models/salesPeople.model";
import {SalesPeopleService} from "../../sales-people/sales-people.service";
import {User} from "@shared/models/user.models";
import {CheckOutDialogDataModel} from "./check-out-dialog-data.model";

@Component({
  templateUrl: 'check-out-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class CheckOutDialogComponent {
  ticketCreation: TicketCreation;
  ticketGiftCreation: GiftTicketCreation;
  totalPurchase: number;
  requestedInvoice = false;
  requestedGiftTicket = false;
  requestedDataProtectionAct = false;
  requestedCreditLine = false;

  constructor(@Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<CheckOutDialogComponent>,
              private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
              private salesPeopleService: SalesPeopleService) {
    this.ticketCreation = {user:this.getUserFromData(data),cash: 0, card: 0, voucher: 0, shoppingList: data.shoppingCart, note: ''};
    this.ticketGiftCreation = {message: ''};
    this.total();
  }
  private getUserFromData(dataModel:CheckOutDialogDataModel): User{
    if(dataModel.mobile != null){
      return <User>{mobile:Number(dataModel.mobile)};
    }
    return null;
  }
  total(): void {
    this.totalPurchase = 0;
    for (const shopping of this.ticketCreation.shoppingList) {
      this.totalPurchase = this.totalPurchase + shopping.total;
    }
    this.totalPurchase = Math.round(this.totalPurchase * 100) / 100;
  }

  format(value: number): number {
    return value ? value : 0; // empty string,NaN,false,undefined,null,0 is: false
  }

  searchUser(mobile: string): void {
    if (mobile) {
      // TODO falta buscar el user en BD, si no existe, debe sacar un dialogo para crearlo
      this.ticketCreation.user = <User>{mobile: Number(mobile)};
    }
  }

  managedMobile(): boolean {
    return !!this.ticketCreation.user;
  }

  resetMobile(): void {
    this.ticketCreation.user = undefined;
  }

  unCommitted(): boolean {
    for (const shopping of this.ticketCreation.shoppingList) {
      if (!shopping.state && shopping.amount > 0) {
        return true;
      }
    }
    return false;
  }

  totalCommitted(): number {
    let total = 0;
    for (const shopping of this.ticketCreation.shoppingList) {
      if (shopping.state) {
        total += shopping.total;
      }
    }
    return Math.round(total * 100) / 100;
  }

  warning(): boolean {
    return !this.managedMobile() && this.unCommitted();
  }

  returnedAmount(): number {
    return Math.round(
      (this.format(this.ticketCreation.cash)
        + this.format(this.ticketCreation.card)
        + this.format(this.ticketCreation.voucher)
        - this.totalPurchase) * 100
    ) / 100;
  }

  returnedCash(): number {
    if (this.ticketCreation.cash >= this.returnedAmount()) {
      return this.returnedAmount();
    } else {
      return this.ticketCreation.cash;
    }
  }

  fillCard(): void {
    if (this.returnedAmount() < 0) {
      this.ticketCreation.card = -this.returnedAmount();
    } else {
      this.ticketCreation.card = this.totalPurchase;
      this.ticketCreation.cash = 0;
    }
  }

  fillCash(): void {
    this.ticketCreation.cash = this.format(this.ticketCreation.cash);
    if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
      this.ticketCreation.cash = -this.returnedAmount();
    } else if (this.ticketCreation.cash < 20) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
    } else if (this.ticketCreation.cash < 50) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
    } else {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
    }
  }

  consumeVoucher(): void {
    this.dialog.open(VoucherApplyDialogComponent).afterClosed()
      .subscribe((voucher) => {
        if (voucher) {
          this.ticketCreation.voucher = voucher.value;
        }
      });
  }

  async associateTicketToSalesPerson(): Promise<Salesperson> {
    let phoneNumber = this.generatePhoneNumber();

    let salesPerson: Salesperson = {
      salesperson: {
        token: "user_token",
        mobile: phoneNumber,
      },
      ticket: null
    };

    salesPerson.salesperson = await this.salesPeopleService.searchSalespersonByMobile(phoneNumber.toString()).toPromise();

    return salesPerson;
  }

  private generatePhoneNumber(): number {
    const randomNumber = Math.random();

    if (randomNumber < 0.5) {
      return 666666001;
    } else {
      return 666666002;
    }
  }

  invalidCheckOut(): boolean {
    return (this.totalPurchase + this.returnedAmount() - this.totalCommitted() < -0.01); // rounding errors
  }

  round(value): any {
    return Math.round(value * 100) / 100;
  }

  async pay(){
    const returned = this.returnedAmount();
    const cash = this.ticketCreation.cash;
    let voucher = 0;
    this.ticketCreation.cash = this.format(this.ticketCreation.cash);
    this.ticketCreation.card = this.format(this.ticketCreation.card);
    this.ticketCreation.voucher = this.format(this.ticketCreation.voucher);
    if (returned > 0) {
      this.ticketCreation.cash -= returned;
    }
    if (this.ticketCreation.cash < 0) {
      voucher = -this.ticketCreation.cash;
      this.ticketCreation.cash = 0;
    }
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.note += ' Pay with card: ' + this.round(this.ticketCreation.card) + '.';
    }
    if (this.ticketCreation.voucher > 0) {
      this.ticketCreation.note += ' Pay with voucher: ' + this.round(this.ticketCreation.voucher) + '.';
    }
    if (this.ticketCreation.cash > 0) {
      this.ticketCreation.note += ' Pay with cash: ' + this.round(cash) + '.';
    }
    if (!this.ticketCreation.note) {
      this.ticketCreation.note += ' No Pay.';
    }
    if (returned > 0) {
      this.ticketCreation.note += ' Return: ' + this.round(returned) + '.';
    }
    let salesperson: Salesperson = await this.associateTicketToSalesPerson();

    this.ticketCreation.note+= '\n Salesperson:' +
      '\n Name: ' + salesperson.salesperson.firstName + '.' +
      '\n Email: ' + salesperson.salesperson.email + '.' ;

    this.shoppingCartService.createTicketAndPrintReceipts(this.ticketCreation, this.ticketGiftCreation, voucher,
      this.requestedInvoice, this.requestedGiftTicket, this.requestedDataProtectionAct, salesperson)
      .subscribe(() => this.dialogRef.close(true));
  }

  invalidInvoice(): boolean {
    // TODO pendiente de calcular. Hace falta tener al usuario totalmente completado
    return true;
  }

  invalidICreditLine(): boolean {
    // TODO pendiente de calcular. Hace falta el usuario
    return true;
  }

  getUserMobile() {
    if(this.managedMobile()){
      return this.ticketCreation.user.mobile;
    }
    return null;
  }
}
