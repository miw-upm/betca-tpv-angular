import {Component, EventEmitter, Output} from "@angular/core";
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Invoice} from "../../models/invoice.model";
import {User} from "@core/models/user.model";
import {InvoiceSearch} from "../../invoice-search";
import {InvoiceService} from "../../services/invoice.service";
import {Ticket} from "../../../cashier-opened/tickets/models/tickets.model";
import {AuthService} from "@core/services/auth.service";

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
        FormsModule,
    ],
    styleUrls: ["./invoice-creation.component.css"]
})

export class InvoiceCreationComponent {
    title: string;
    invoice: Invoice;
    ticket: Ticket;
    user: User
    search: InvoiceSearch;
    @Output() invoiceEventEmitter: EventEmitter<Invoice> = new EventEmitter<Invoice>();


    constructor(private invoiceService: InvoiceService, private dialog: MatDialog, private auth: AuthService) {
        this.title = 'Create Invoice';
        this.invoice = {
            identity: undefined,
            creationDate: new Date(),
            baseTax: 0,
            taxValue: 0,
            user: this.auth.getUser(),
            ticket: undefined
        }
        this.invoice.ticket = {
            card: "", cash: "", class: "", creationDate: undefined, id: "", note: "",
            reference: "", shoppingList: undefined, userMobile: "", voucher: ""
        };

        this.invoice.user = this.auth.getUser();
    }

    create(): void {
        this.invoiceService
            .create(this.invoice)
            .subscribe((invoice) => {
                this.invoiceEventEmitter.emit(invoice);
                this.dialog.closeAll();
            });
    }
}