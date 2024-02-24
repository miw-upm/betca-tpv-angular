import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceService} from "./invoice.service";
import {TicketCreation} from "../cashier-opened/shopping-cart/ticket-creation.model";
import {User} from "@core/user.model";
import {InvoiceSearch} from "./invoice-search.model";

@Component({
  templateUrl: 'invoice-creation-dialog.component.html',
  styleUrls: ['invoice-creation-dialog.component.css']
})

export class InvoiceCreationDialogComponent {
  title: string;
  invoice : Invoice;
  ticket : TicketCreation;
  ticketList : string[]
  user : User
  ticketSelected : string;
  search : InvoiceSearch;

  constructor(@Inject(MAT_DIALOG_DATA) data: Invoice, private invoiceService: InvoiceService, private dialog: MatDialog) {
    this.title = 'Create Invoice';
    this.invoice = data ? data : {
      identity: undefined,
      creationDate: new Date(),
      baseTax: undefined,
      taxValue: undefined,
      user: undefined,
      ticket: undefined
    };

    this.invoice.ticket = data ? data.ticket: undefined;

    //para probar ui
    this.ticketList = [ 'prueba1' , 'prueba2' , 'prueba3'];
  }

  isCreate(): boolean {
    return this.invoice.identity === undefined;
  }

  create(): void {
    this.invoiceService
      .create(this.invoice)
      .subscribe(() => this.dialog.closeAll());
  }

  searchByMobile(): void {
    this.invoiceService.searchByMobile(this.search);
  }

  searchByTicket(): void {
    this.invoiceService.searchByTicket(this.search);
  }

  invalid(): boolean {
    return !this.ticketSelected;
  }

}
