import {Component, Inject, EventEmitter, Output} from "@angular/core";
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
    identity : number;
    mobile : string;
    @Output() invoiceEventEmitter: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor(@Inject(MAT_DIALOG_DATA) data: number, private invoiceService: InvoiceService, private dialog: MatDialog) {
        this.title = 'Update Invoice';
        this.identity = data;
        this.mobile = "";
    }

    update(): void {
        this.invoiceService
            .updateUser(this.identity, this.mobile)
            .subscribe((invoice) => {
                this.invoiceEventEmitter.emit(invoice);
                this.dialog.closeAll();
            });
    }
}