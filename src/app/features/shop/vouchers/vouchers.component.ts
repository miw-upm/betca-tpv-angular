import { Component } from "@angular/core";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatIcon } from "@angular/material/icon";
import { CrudComponent } from "@common/components/crud.component";
import { FilterInputComponent } from "@common/components/filter-input.component";
import { MatButton } from "@angular/material/button";
import { of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ReadDetailDialogComponent } from "@common/dialogs/read-detail.dialog.component";
import { VoucherSearch } from "./vouchers-search.model";
import { VoucherService } from "./vouchers.service";
import { Voucher } from "../shared/models/voucher.model";
import { VoucherCreationDialogComponent } from "./vouchers-creation-dialog.component";

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatIcon, CrudComponent,
        FilterInputComponent, MatButton, MatCardTitle],
    templateUrl: 'vouchers.component.html'
})
export class VouchersComponent {
    voucherSearch: VoucherSearch;
    title = 'Vouchers management';
    vouchers = of([]);

    constructor(private readonly dialog: MatDialog, private readonly voucherService: VoucherService) {
        this.resetSearch();
    }

    search(): void {
        this.vouchers = this.voucherService.search(this.voucherSearch);
    }

    resetSearch(): void {
        this.voucherSearch = { value: null, reference: "" };
    }

    create(): void {
        this.dialog.open(VoucherCreationDialogComponent);
    }

    read(voucher: Voucher): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Voucher Details',
                object: this.voucherService.read(voucher.reference)
            }
        });
    }

    print(item: any): void {
        console.log('Imprimiendo:', item);
    }
}