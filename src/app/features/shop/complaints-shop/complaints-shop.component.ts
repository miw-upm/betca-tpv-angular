import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ComplaintService} from '../../shared/services/complaint.service';
import {ReadDetailDialogComponent} from '../../../common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '../../../common/components/crud.component';
import {Complaint} from '../../shared/models/complaint.model';
import {MatIconButton} from "@angular/material/button";
import {ComplaintShopService} from "./complaint-shop.service";
import {ComplaintUpdateShopDialogComponent} from "./complaint-update-shop-dialog.component";
import {AuthService} from "@core/services/auth.service";


@Component({
    standalone: true,
    imports: [MatCard, MatIcon, CrudComponent, MatCardContent, MatIconButton],
    templateUrl: 'complaints-shop.component.html'
})
export class ComplaintsShopComponent {
    title = 'Complaints management';
    complaints = of([]);

    constructor(private readonly dialog: MatDialog, private readonly complaintShopService: ComplaintShopService,private readonly authService:AuthService) {
        this.searchAll();
    }

    searchAll(): void {
        this.complaints = this.complaintShopService.searchAll();
    }

    read(complaint: Complaint): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Complaint Details',
                object: this.complaintShopService.read(complaint.id)
            }
        });
    }

    update(complaint: Complaint){
        this.dialog
            .open(ComplaintUpdateShopDialogComponent)
            .afterClosed()
            .subscribe(() => this.searchAll());
    }

    canDelete(){
        return this.authService.isAdmin();
    }
}
