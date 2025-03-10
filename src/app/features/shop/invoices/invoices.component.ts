import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "./services/invoice.service";
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Invoice, InvoiceDetails} from "./models/invoice.model";
import {InvoiceCreationComponent} from "./components/invoice-creation/invoice-creation.component";
import {InvoiceUpdatingComponent} from "./components/invoice-updating/invoice-updating.component";
import {CrudComponent} from "@common/components/crud.component";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {map} from "rxjs/operators";
import {FormsModule} from "@angular/forms";
import {InvoiceSearch} from "./invoice-search";
import {FilterInputComponent} from "@common/components/filter-input.component";
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    standalone: true,
    imports: [
        CrudComponent,
        MatIcon,
        MatDivider,
        MatToolbar,
        MatButton,
        FormsModule,
        FilterInputComponent
    ],
    styleUrls: ['./invoices.component.css']
})

export class  InvoicesComponent implements OnInit {
    title = "Invoice management";
    invoices: Observable<InvoiceDetails[]> = of([]);
    invoiceSearch: InvoiceSearch = {mobile: undefined, ticketId: undefined};

    ngOnInit(): void {
        this.loadInvoice();
    }

    constructor(private dialog: MatDialog, private invoiceService: InvoiceService) {
    }

    loadInvoice(): void {
        this.invoices = this.invoiceService.searchAll().pipe(
            map(invoices =>
                invoices.map(invoice => convertFromInvoiceToInvoiceDetails(invoice)
                ))
        );
    }

    read(invoice: Invoice): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Invoice Details',
                identity: invoice.identity,
                object: this.invoiceService.read(invoice.identity)
                    .pipe(map(invoice => convertFromInvoiceToInvoiceDetails(invoice)))
            },
        });
    }

    create(): void {
        const dialogRef = this.dialog
            .open(InvoiceCreationComponent);
        dialogRef.componentInstance.invoiceEventEmitter
            .subscribe(() => this.loadInvoice());
    }

    update(invoice: Invoice): void {
        const dialogRef = this.dialog.open(InvoiceUpdatingComponent, {data: invoice.identity});
        dialogRef.componentInstance.invoiceEventEmitter.subscribe(() => this.loadInvoice());
    }

    downloadInvoice(invoice: Invoice): void {
        this.invoiceService.readReceipt(invoice.identity).subscribe();
    }

    searchByTicketId(): void {
        this.invoices = this.invoiceService
            .searchByTicketId(this.invoiceSearch.ticketId)
            .pipe(
                map(invoice => [convertFromInvoiceToInvoiceDetails(invoice)]));
    }

    searchByUserMobile(): void {
        this.invoices = this.invoiceService
            .searchByUserMobile(this.invoiceSearch.mobile)
            .pipe(
                map(invoice => invoice.map(invoice =>convertFromInvoiceToInvoiceDetails(invoice)))
            );
    }

    resetSearch(): void {
        this.invoiceSearch = {};
        this.loadInvoice();
    }
}

function convertFromInvoiceToInvoiceDetails(invoice: Invoice): InvoiceDetails {
    return {
        identity: invoice.identity ,
        creationDate: invoice.creationDate ,
        ticketId: invoice.ticket.id      ,
        baseTax: invoice.baseTax,
        taxValue: invoice.taxValue,
        userMobile: invoice.user.mobile
    };
}