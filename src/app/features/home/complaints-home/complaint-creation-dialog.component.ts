import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import {AuthService} from '@core/services/auth.service';
import {ComplaintService} from './complaint.service';
import {Complaint} from './complaint.model';

@Component({
    standalone: true,
    imports: [MatDialogContent, MatFormField, MatLabel, FormsModule, MatDialogActions, MatDialogTitle, MatInput,
        MatDialogClose, MatButton],
    templateUrl: 'complaint-creation-dialog.component.html',
    styleUrls: ['complaint-dialog.component.css']
})

export class ComplaintCreationDialogComponent {
    complaint: Complaint;

    constructor(private readonly complaintService: ComplaintService, private readonly dialog: MatDialog, private readonly authService: AuthService) {
        this.complaint = {barcode: undefined, description: undefined};
    }

    create(): void {
        this.complaintService
            .create(this.complaint)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.complaint.barcode) || this.check(this.complaint.description);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }
}
