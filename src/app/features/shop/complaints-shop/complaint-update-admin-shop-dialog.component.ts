import {Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

import {ComplaintShopService} from "./complaint-shop.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {ComplaintState} from "../../shared/models/complaintState.model";
import {ComplaintUpdateAdminModel} from "./complaintUpdateAdmin.model";

@Component({
    standalone: true,
    imports: [MatDialogContent, MatFormField, MatLabel, FormsModule, MatDialogActions, MatDialogTitle, MatInput,
        MatDialogClose, MatButton, MatSelect, MatOption,CommonModule],
    templateUrl: 'complaint-update-admin-shop-dialog.component.html',
    styleUrls: ['complaint-shop-dialog.component.css']
})

export class ComplaintUpdateAdminShopDialogComponent {
    tittle:string;
    trackingCode:string;
    complaint: ComplaintUpdateAdminModel;
    complaintStates = ComplaintState;
    constructor(@Inject(MAT_DIALOG_DATA) data: any,private readonly complaintShopService: ComplaintShopService, private readonly dialog: MatDialog) {
        this.tittle = data.title;
        this.complaint=data.complaint;
        this.trackingCode = data.trackingCode;
    }

    update(): void {
        this.dialog.closeAll();
        this.complaintShopService
            .updateAdmin(this.trackingCode,this.complaint)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.complaint.barcode) && this.check(this.complaint.description)
            && this.check(this.complaint.reply) && this.check(this.complaint.userMobile.toString());
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }
}
