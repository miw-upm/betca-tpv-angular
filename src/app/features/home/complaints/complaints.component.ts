import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ComplaintService} from './complaint.service';
import {ComplaintCreationDialogComponent} from './complaint-creation-dialog.component';
import {ReadDetailDialogComponent} from '../../../common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '../../../common/components/crud.component';
import {Complaint} from './complaint.model';
import {MatIconButton} from "@angular/material/button";

@Component({
    standalone: true,
    imports: [MatCard, MatIcon, CrudComponent, MatCardContent, MatIconButton],
    templateUrl: 'complaints.component.html'
})
export class ComplaintsComponent {
    title = 'Complaints management';
    complaints = of([]);

    constructor(private readonly dialog: MatDialog, private readonly complaintService: ComplaintService) {
    }

    create(): void {
        this.dialog
            .open(ComplaintCreationDialogComponent)
            .afterClosed()
            .subscribe(() => this.searchAll());
    }

    searchAll(): void {
        this.complaints = this.complaintService.searchAll();
    }

    read(complaint: Complaint): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Complaint Details',
                object: this.complaintService.read(complaint.id)
            }
        });
    }

    delete(complaint: Complaint): void {
        this.complaintService
            .delete(complaint.id)
            .subscribe(() => this.searchAll());
    }
}
