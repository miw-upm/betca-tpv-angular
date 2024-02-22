import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "./invoice.service";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {InvoiceSearch} from "./invoice-search";
import {InvoiceCreationUpdatingDialogComponent} from "./invoice-creation-updating-dialog.component";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title = 'Invoice management';
  invoice = of([]);

  ngOnInit(): void {
    this.loadInvoice();
  }

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService) {
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.invoice = this.invoiceService.searchAll();
  }

  search(search: InvoiceSearch): void {
    this.invoice = this.invoiceService.search(search);
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
    this.dialog.open(InvoiceCreationUpdatingDialogComponent);
  }

  update(invoice: Invoice): void {
    this.invoiceService.read(invoice.identity)
      .subscribe(fullArticle => this.dialog.open(InvoiceCreationUpdatingDialogComponent, { data: invoice }));
  }

}
