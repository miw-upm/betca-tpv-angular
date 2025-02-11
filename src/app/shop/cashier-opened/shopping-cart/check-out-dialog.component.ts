import {Component, Inject} from '@angular/core';

import {TicketCreation} from './ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  standalone:true,
  templateUrl: 'check-out-dialog.component.html',
  imports: [
    MatDialogTitle,
    CurrencyPipe,
    MatDialogContent,
    NgIf,
    MatIcon,
    MatFormField,
    MatInput,
    MatButton,
    MatIconButton,
    FormsModule,
    MatCheckbox,
    MatDialogActions,
    MatDialogClose,
    MatSuffix
  ],
  styleUrls: ['check-out-dialog.component.css']
})
export class CheckOutDialogComponent {
  ticketCreation: TicketCreation;
  totalPurchase: number;
  requestedInvoice = false;
  requestedGiftTicket = false;
  requestedDataProtectionAct = false;

  constructor(@Inject(MAT_DIALOG_DATA) data, private readonly dialogRef: MatDialogRef<CheckOutDialogComponent>,
              private readonly shoppingCartService: ShoppingCartService) {
    this.ticketCreation = {cash: 0, card: 0, voucher: 0, shoppingList: data, note: ''};
    this.total();
  }

  total(): void {
    this.totalPurchase = 0;
    for (const shopping of this.ticketCreation.shoppingList) {
      this.totalPurchase = this.totalPurchase + shopping.total;
    }
    this.totalPurchase = Math.round(this.totalPurchase * 100) / 100;
  }

  format(value: number): number {
    return value || 0; // empty string,NaN,false,undefined,null,0 is: false
  }

  searchUser(mobile: string): void {
    if (mobile) {
      // TODO falta buscar el user en BD, si no existe, debe sacar un dialogo para crearlo
      this.ticketCreation.user = {mobile: Number(mobile)};
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
    // TODO consumir un vale que se entrega como parte del pago
  }

  invalidCheckOut(): boolean {
    return (this.totalPurchase + this.returnedAmount() - this.totalCommitted() < -0.01); // rounding errors
  }

  round(value): any {
    return Math.round(value * 100) / 100;
  }

  pay(): any {
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
    this.shoppingCartService.createTicketAndPrintReceipts(this.ticketCreation, voucher,
      this.requestedInvoice, this.requestedGiftTicket, this.requestedDataProtectionAct)
      .subscribe(() => this.dialogRef.close(true));
  }

  invalidInvoice(): boolean {
    // TODO pendiente de calcular. Hace falta tener al usuario totalmente completado
    return true;
  }

}
