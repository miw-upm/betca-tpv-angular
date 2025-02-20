import {Component, OnInit} from '@angular/core';
import {InvoiceSearch} from "./invoice-search";
import {InvoiceService} from "./services/invoice.service";
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {Invoice} from "./models/invoice.model";
import {InvoiceCreationComponent} from "./components/invoice-creation/invoice-creation.component";
import {InvoiceUpdatingComponent} from "./components/invoice-updating/invoice-updating.component";
import {CrudComponent} from "@common/components/crud.component";

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    standalone: true,
    imports: [
        CrudComponent
    ],
    styleUrls: ['./invoices.component.css']
})

export class  InvoicesComponent implements OnInit {
    title = "Invoice management";
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
        this.dialog.open(InvoiceCreationComponent);
    }

    update(invoice: Invoice): void {
        this.invoiceService.read(invoice.identity)
            .subscribe(fullArticle => this.dialog.open(InvoiceUpdatingComponent, { data: invoice }));
    }
}