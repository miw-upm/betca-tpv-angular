import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {AuthService} from '@core/services/auth.service';

import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintShopService} from "./complaint-shop.service";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
    standalone: true,
    imports: [MatDialogContent, MatFormField, MatLabel, FormsModule, MatDialogActions, MatDialogTitle, MatInput,
        MatDialogClose, MatButton, MatSelect, MatOption,CommonModule],
    templateUrl: 'complaint-update-shop-dialog.component.html',
    styleUrls: ['complaint-shop-dialog.component.css']
})

export class ComplaintUpdateShopDialogComponent {
    complaint: Complaint;
    states : string[] = ["Abierto","Cerrado"];

    constructor(private readonly complaintShopService: ComplaintShopService, private readonly dialog: MatDialog, private readonly authService: AuthService) {
        this.complaint = {barcode: "232435543", description: "dsfdfd",
            userMobile:722256532, registrationDate:new Date(2025, 1, 2),
            reply:"Respuesta determinada",
            state: "Abierto"
        };
    }

    update(): void {
        this.dialog.closeAll();
        /*this.complaintHomeService
            .create(this.complaint)
            .subscribe(() => this.dialog.closeAll());*/
    }

    invalid(): boolean {
        return this.check(this.complaint.barcode) || this.check(this.complaint.description);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }
}
