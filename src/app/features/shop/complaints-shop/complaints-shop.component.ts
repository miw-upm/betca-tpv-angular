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
import {CancelYesDialogComponent} from "@common/dialogs/cancel-yes-dialog.component";

@Component({
    standalone: true,
    imports: [MatCard, MatIcon, CrudComponent, MatCardContent, MatIconButton],
    templateUrl: 'complaints-shop.component.html'
})
export class ComplaintsShopComponent {
    title = 'Complaints management';
    complaints = of([]);

    constructor(private readonly dialog: MatDialog, private readonly complaintShopService: ComplaintShopService) {
        this.searchAll();
    }

    searchAll(): void {
        //this.complaints = this.complaintShopService.searchAll();
        this.complaints = of([{id:"1",registrationDate:"14/02/2024",mobile: 722255454
            , barcode: 434533, description: "Queja San Valentín", state: "finalizado",
            reply: ""},
            {id:"2",registrationDate:"01/02/2024",mobile: 652542525
                , barcode: 434531, description: "Queja Febrero", state: false,
                reply: ""},
            {id:"3",registrationDate:"07/02/2024",mobile: 555555555
                , barcode: 434553, description: "Queja tienda", state: false,
                reply: ""},
        ]);
    }

    read(complaint: Complaint): void {
        /*this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Complaint Details',
                object: this.complaintShopService.read(complaint.id)
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

    delete(complaint: Complaint): void {
        this.complaintShopService
            .delete(complaint.id)
            .subscribe(() => this.searchAll());
    }
}
