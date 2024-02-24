import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceService} from "./invoice.service";
import {TicketCreation} from "../cashier-opened/shopping-cart/ticket-creation.model";
import {AuthService} from "@core/auth.service";
import {User} from "@core/user.model";

@Component({
  templateUrl: 'invoice-creation-dialog.component.html',
  styleUrls: ['invoice-creation-dialog.component.css']
})

export class InvoiceCreationDialogComponent {
  title: string;
  invoice : Invoice;
  ticket : TicketCreation;
  ticketList : TicketCreation[]
  user : User
  ticketSelected : boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: Invoice, private invoiceService: InvoiceService, private dialog: MatDialog, private auth: AuthService) {
    this.title = data ? 'Update Invoice' : 'Create Invoice';
    this.invoice = data ? data : {
      identity: undefined,
      creationDate: new Date(),
      baseTax: undefined,
      taxValue: undefined,
      user: undefined,
      ticket: this.ticket
    };
    this.ticketSelected = false;
    this.invoice.ticket = data ? data.ticket: undefined;
    this.ticket = {cash: 0, card: 0, voucher: 0, shoppingList: [], note: 'ticket'}
    this.ticketList = [{cash: 0, card: 0, voucher: 0, shoppingList: [], note: 'lista ticket'}];
  }

  isCreate(): boolean {
    return this.invoice.identity === undefined;
  }

  create(): void {
    this.invoiceService
      .create(this.invoice)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.invoiceService
      .update(this.invoice, this.user)
      .subscribe(() => this.dialog.closeAll());
  }

  search(): void {
    // TODO: search ticket
  }

  toggleInvoiceSelection(): boolean {
    this.ticketSelected = !this.ticketSelected;
    return this.ticketSelected;
  }

  invalid(): boolean {
    return !this.ticketSelected;
  }

}
