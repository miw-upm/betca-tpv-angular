import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ComplaintService} from '../../shared/services/complaint.service';
import {ComplaintCreationDialogComponent} from './complaint-creation-dialog.component';
import {ReadDetailDialogComponent} from '../../../common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '../../../common/components/crud.component';
import {Complaint} from '../../shared/models/complaint.model';
import {MatIconButton} from "@angular/material/button";
import {ComplaintHomeService} from "./complaint-home.service";
import {ComplaintUpdateHomeDialogComponent} from "./complaint-update-home-dialog.component";

@Component({
    standalone: true,
    imports: [MatCard, MatIcon, CrudComponent, MatCardContent, MatIconButton],
    templateUrl: 'complaints-home.component.html'
})
export class ComplaintsHomeComponent {
    title = 'Complaints management';
    complaints = of([]);

    constructor(private readonly dialog: MatDialog, private readonly complaintHomeService: ComplaintHomeService) {
        this.searchByUserMobile();
    }

    create(): void {
        this.dialog
            .open(ComplaintCreationDialogComponent)
            .afterClosed()
            .subscribe(() => this.searchByUserMobile());
    }

    searchByUserMobile(): void {
        this.complaints = this.complaintHomeService.searchByUserMobile();
    }

    read(complaint: Complaint): void {
        /*this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Complaint Details',
                object: this.complaintService.read(complaint.id)
            }
        });*/
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Complaint Details',
                object: of({id:"1",registrationDate:"14/02/2024",mobile: 722255454
                    , barcode: 434533, description: "Queja San Valentín", state: "finalizado",
                    reply: ""})
            }
        });
    }
    update(complaint: Complaint){
        this.dialog
            .open(ComplaintUpdateHomeDialogComponent)
            .afterClosed()
            .subscribe(() => this.searchByUserMobile());
    }
    delete(complaint: Complaint): void {

        this.complaintHomeService
            .delete(complaint.id)
            .subscribe(() => this.searchByUserMobile());
    }
}
