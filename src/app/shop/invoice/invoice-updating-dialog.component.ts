import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceService} from "./invoice.service";
import {AuthService} from "@core/auth.service";

@Component({
  templateUrl: 'invoice-updating-dialog.component.html',
  styleUrls: ['invoice-updating-dialog.component.css']
})

export class InvoiceUpdatingDialogComponent {
  title: string;
  invoice : Invoice;

  constructor(@Inject(MAT_DIALOG_DATA) data: Invoice, private invoiceService: InvoiceService, private dialog: MatDialog, private auth: AuthService) {
    this.title = 'Update Invoice';
    this.invoice = data ? data : {
      identity: undefined,
      creationDate: new Date(),
      baseTax: undefined,
      taxValue: undefined,
      user: this.auth.getUser(),
      ticket: undefined
    };
  }

  update(): void {
    this.invoiceService
      .update(this.invoice, this.invoice.user)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.invoice.user.name) || (this.invoice.user.mobile === undefined || null);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

}
