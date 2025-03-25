import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';
import {ReadDetailDialogComponent} from '../../../common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '../../../common/components/crud.component';
import {Complaint} from '../../shared/models/complaint.model';
import {MatIconButton} from "@angular/material/button";
import {ComplaintShopService} from "./complaint-shop.service";
import {ComplaintUpdateAdminShopDialogComponent} from "./complaint-update-admin-shop-dialog.component";
import {AuthService} from "@core/services/auth.service";
import {ComplaintUpdateAdminModel} from "./complaintUpdateAdmin.model";
import {ComplaintState} from "../../shared/models/complaintState.model";


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
                object: this.complaintShopService.read(complaint.trackingCode)
            }
        });
    }

    update(complaint: Complaint){
        const complaintUpdate: ComplaintUpdateAdminModel = {
            userMobile: complaint.userMobile,
            barcode: complaint.barcode,
            description: complaint.description,
            reply: complaint.reply,
            state: (complaint.state.toString() == "OPEN" ? ComplaintState.OPEN:ComplaintState.CLOSED)
        };

        this.dialog
            .open(ComplaintUpdateAdminShopDialogComponent,{
                data: {
                    tittle: 'Complaint Update',
                    trackingCode: complaint.trackingCode,
                    complaint: complaintUpdate
                }
            })
            .afterClosed()
            .subscribe(() => this.searchAll());
    }

    canDelete():boolean{
        return this.authService.isAdmin();
    }

    delete(complaint:Complaint){
        this.complaintShopService
            .delete(complaint.trackingCode)
            .subscribe(() => this.searchAll());
    }
}
