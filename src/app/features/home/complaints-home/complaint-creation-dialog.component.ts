import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import {AuthService} from '@core/services/auth.service';

import {ComplaintHomeService} from "./complaint-home.service";
import {SearchByBarcodeComponent} from "../../shop/shared/components/search-by-barcode.component";
import {ComplaintCreation} from "../../shared/models/complaintCreation.model";
import {MatOption, MatSelect} from "@angular/material/select";
import {SearchBarcodesByUserloggedComponent} from "./search-barcodes-by-userlogged.component";

@Component({
    standalone: true,
    imports: [MatDialogContent, MatFormField, MatLabel, FormsModule, MatDialogActions, MatDialogTitle, MatInput,
        MatDialogClose, MatButton, SearchByBarcodeComponent, MatSelect, MatOption, SearchBarcodesByUserloggedComponent],
    templateUrl: 'complaint-creation-dialog.component.html',
    styleUrls: ['complaint-home-dialog.component.css']
})

export class ComplaintCreationDialogComponent {
    complaintCreation: ComplaintCreation;

    constructor(private readonly complaintHomeService: ComplaintHomeService, private readonly dialog: MatDialog, private readonly authService: AuthService) {
        this.complaintCreation = {barcode: "", description: "",userMobile:authService.getMobile()};
    }

    create(): void {
        this.dialog.closeAll();
        this.complaintHomeService
            .create(this.complaintCreation)
            .subscribe(() => this.dialog.closeAll());
    }

    addBarcode(barcode:string){
        this.complaintCreation.barcode = barcode;
    }
    invalid(): boolean {
        return this.check(this.complaintCreation.barcode) || this.check(this.complaintCreation.description);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }
}
