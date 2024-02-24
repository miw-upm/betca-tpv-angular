import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "./invoice.service";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceCreationDialogComponent} from "./invoice-creation-dialog.component";
import {InvoiceSearch} from "./invoice-search.model";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title = 'Invoice management';
  invoiceSearch : InvoiceSearch = {mobile : undefined, ticket: undefined};
  invoice = of([]);

  ngOnInit(): void {
    this.loadInvoice();
  }

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService) {
  }

  loadInvoice(): void {
    this.invoice = this.invoiceService.searchAll();
  }

  searchByMobile(): void {
    this.invoice = this.invoiceService.searchByMobile(this.invoiceSearch);
  }

  searchByTicket(): void {
    this.invoice = this.invoiceService.searchByTicket(this.invoiceSearch);
  }

  resetSearch(): void {
    this.invoiceSearch = {};
    this.loadInvoice();
  }

  read(invoice: Invoice): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Invoice Details',
        object: this.invoiceService.read(invoice.identity)
      }
    });
  }

  create(): void {
    this.dialog.open(InvoiceCreationDialogComponent);
  }

  update(invoice: Invoice): void {
    this.invoiceService.read(invoice.identity)
      .subscribe(fullArticle => this.dialog.open(InvoiceCreationDialogComponent, { data: invoice }));
  }

}
