import { Component, Inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { Observable, of } from 'rxjs';

import { VoucherService } from './vouchers.service';
import { SearchByCompanyComponent } from '../shared/components/search-by-company.component';
import { Voucher } from "../shared/models/voucher.model";

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput,
        NgIf, MatDialogActions, MatDialogClose, MatButton],
    templateUrl: 'vouchers-creation-dialog.component.html',
    styleUrls: ['vouchers-creation-dialog.component.css']
})
export class VoucherCreationDialogComponent {
    voucher: Voucher;
    title: string;
    oldReference: string;
    companies: Observable<string[]> = of([]);

    constructor(@Inject(MAT_DIALOG_DATA) data: Voucher, private readonly voucherService: VoucherService, private readonly dialog: MatDialog) {
        this.title = 'Create Voucher';
        this.voucher = {
            reference: undefined, value: undefined, creationDate: undefined, dateOfUse: undefined,
            user: undefined
        };
        this.oldReference = undefined;
    }

    isCreate(): boolean {
        return this.oldReference === undefined;
    }

    create(): void {
        this.voucherService
            .create(this.voucher)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.voucher.reference) || this.check(this.voucher.value);
    }

    check(attr: string | number): boolean {
        return attr === undefined || attr === null || attr === '';
    }

}
