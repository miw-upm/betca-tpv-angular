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

import {MatOption, MatSelect} from "@angular/material/select";
import {ComplaintHomeService} from "./complaint-home.service";
import {ComplaintUpdateCustomerModel} from "./complaintUpdateCustomer.model";

@Component({
    standalone: true,
    imports: [MatDialogContent, MatFormField, MatLabel, FormsModule, MatDialogActions, MatDialogTitle, MatInput,
        MatDialogClose, MatButton, MatSelect, MatOption,CommonModule],
    templateUrl: 'complaint-update-customer-home-dialog.component.html',
    styleUrls: ['complaint-home-dialog.component.css']
})

export class ComplaintUpdateCustomerHomeDialogComponent {
    tittle:string;
    trackingCode:string;
    complaint: ComplaintUpdateCustomerModel;
    constructor(@Inject(MAT_DIALOG_DATA) data: any,private readonly complaintHomeService: ComplaintHomeService, private readonly dialog: MatDialog) {
        this.tittle = data.title;
        this.complaint=data.complaint;
        this.trackingCode = data.trackingCode;
    }

    update(): void {
        this.dialog.closeAll();
        this.complaintHomeService
            .update(this.trackingCode,this.complaint)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return  this.check(this.complaint.description);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }
}
