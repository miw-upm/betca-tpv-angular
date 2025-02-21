import {Component, Inject} from "@angular/core";
import {
    MAT_DIALOG_DATA, MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { TicketCreation } from "app/features/shop/cashier-opened/shopping-cart/ticket-creation.model";
import {Invoice} from "../../models/invoice.model";
import {User} from "@core/models/user.model";
import {InvoiceSearch} from "../../invoice-search";
import {InvoiceService} from "../../services/invoice.service";

@Component({
    templateUrl: "./invoice-creation.component.html",
    standalone: true,
    imports: [
        MatDialogActions,
        MatFormField,
        MatDialogContent,
        MatInput,
        MatLabel,
        MatButton,
        MatDialogClose,
        MatDialogTitle,
        ReactiveFormsModule,
    ],
    styleUrls: ["./invoice-creation.component.css"]
})

export class InvoiceCreationComponent {
    title: string;
    invoice: Invoice;
    ticket: TicketCreation;
    user: User
    search: InvoiceSearch;

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
        this.invoice.ticket = data ? data.ticket : undefined;
    }
}