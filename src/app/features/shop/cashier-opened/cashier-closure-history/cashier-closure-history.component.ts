import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MonthPickerComponent} from "./month-picker/month-picker.component";
import {YearPickerComponent} from "./year-picker/year-picker.component";
import {CurrencyPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSuffix} from "@angular/material/form-field";
import {CashierClosure} from "../cashier-closure/cashier-closure.model";
import moment from "moment";
import {SearchCriteria} from "./search-criteria.model";


@Component({
    selector: 'app-cashier-closure-history',
    imports: [
        MatCardContent,
        MatCard,
        ReactiveFormsModule,
        MatNativeDateModule,
        MonthPickerComponent,
        YearPickerComponent,
        CurrencyPipe,
        MatCardTitle,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
    ],
    templateUrl: './cashier-closure-history.component.html',
    standalone: true,
    styleUrl: './cashier-closure-history.component.css'
})
export class CashierClosureHistoryComponent {

    protected cashierClosures : CashierClosure[] = [
        { finalCash: 119.27, finalCard: 213.27, comment: 'Cierre de caja: 2025-02-11 19:03:44' },
        { finalCash: 479.11, finalCard: 647.9, comment: 'Cierre de caja: 2025-02-06 19:03:44' },
        { finalCash: 358.31, finalCard: 512.16, comment: 'Cierre de caja: 2025-01-28 19:03:44' },
        { finalCash: 67.09, finalCard: 744.32, comment: 'Cierre de caja: 2025-01-24 19:03:44' },
        { finalCash: 129.99, finalCard: 284.15, comment: 'Cierre de caja: 2025-02-09 19:03:44' },
        { finalCash: 102.03, finalCard: 703.7, comment: 'Cierre de caja: 2025-02-15 19:03:44' },
        { finalCash: 324.24, finalCard: 104.21, comment: 'Cierre de caja: 2025-02-08 19:03:44' },
        { finalCash: 444.48, finalCard: 768.77, comment: 'Cierre de caja: 2025-02-13 19:03:44' },
        { finalCash: 92.18, finalCard: 885.59, comment: 'Cierre de caja: 2025-01-26 19:03:44' },
        { finalCash: 316.82, finalCard: 350.06, comment: 'Cierre de caja: 2025-02-04 19:03:44' },
        { finalCash: 487.48, finalCard: 266.76, comment: 'Cierre de caja: 2025-02-06 19:03:44' },
        { finalCash: 166.41, finalCard: 543.92, comment: 'Cierre de caja: 2025-02-13 19:03:44' },
        { finalCash: 375.6, finalCard: 640.24, comment: 'Cierre de caja: 2025-01-29 19:03:44' },
        { finalCash: 241.87, finalCard: 853.66, comment: 'Cierre de caja: 2025-01-25 19:03:44' },
        { finalCash: 319.75, finalCard: 462.69, comment: 'Cierre de caja: 2025-02-01 19:03:44' }
    ];

    protected total = this.cashierClosures.reduce((prv, cur) => prv + cur.finalCard + cur.finalCard, 0);

    public displayedColumns = ['finalCash', 'finalCard', 'total', 'comment'];

    updateDataset($event: SearchCriteria) {
        console.log("Retrieve cashier closures searching by: "+JSON.stringify($event))
    }
}
