import {Component, Inject} from "@angular/core";
import {Invoice} from "../../models/invoice.model";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {InvoiceService} from "../../services/invoice.service";
import {AuthService} from "@core/services/auth.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
    templateUrl: "./invoice-updating.component.html",
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        FormsModule
    ],
    styleUrls: ["./invoice-updating.component.css"]
})

export class InvoiceUpdatingComponent {
    title: string;
    invoice: Invoice;

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
}