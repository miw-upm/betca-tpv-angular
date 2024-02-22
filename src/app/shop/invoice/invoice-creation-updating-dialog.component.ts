import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceService} from "./invoice.service";
import {TicketCreation} from "../cashier-opened/shopping-cart/ticket-creation.model";
import {Tax} from "../shared/services/models/Tax";
import {AuthService} from "@core/auth.service";
import {User} from "@core/user.model";

@Component({
  templateUrl: 'invoice-creation-updating-dialog.component.html',
  styleUrls: ['invoice-dialog.component.css']
})

export class InvoiceCreationUpdatingDialogComponent {
  title: string;
  invoice : Invoice;
  ticket : TicketCreation;
  user : User

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
    this.invoice.ticket = data ? data.ticket: undefined;
  }

  isCreate(): boolean {
    return this.invoice.identity === undefined;
  }

  create(): void {
    this.invoiceService
      .create(Tax.GENERAL, this.ticket)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.invoiceService
      .update(this.invoice, this.user)
      .subscribe(() => this.dialog.closeAll());
  }

  onSubmit(): void {
    if (this.isCreate()) {
      this.create();
    } else {
      this.update();
    }
  }
}
