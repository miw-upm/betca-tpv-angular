import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "./services/invoice.service";
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {Invoice} from "./models/invoice.model";
import {InvoiceCreationComponent} from "./components/invoice-creation/invoice-creation.component";
import {InvoiceUpdatingComponent} from "./components/invoice-updating/invoice-updating.component";
import {CrudComponent} from "@common/components/crud.component";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    standalone: true,
    imports: [
        CrudComponent,
        MatLabel,
        MatFormField,
        MatIcon,
        MatDivider,
        MatInput,
        MatSuffix,
        MatToolbar,
        MatButton
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
    }
    loadInvoice(): void {
        this.invoice = this.invoiceService.searchAll().pipe(map((invoices:Invoice[])=> {
            return invoices.map((invoice:Invoice) =>{
                return {
                    identity: invoice.identity,
                    creationDate: invoice.creationDate,
                    baseTax: invoice.baseTax,
                    taxValue: invoice.taxValue,
                    user: invoice.user.name,
                    ticket: invoice.ticket
                }})
        }) );
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