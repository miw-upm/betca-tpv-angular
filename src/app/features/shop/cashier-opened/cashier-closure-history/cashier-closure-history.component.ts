import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MonthPickerComponent} from "./month-picker/month-picker.component";
import {YearPickerComponent} from "./year-picker/year-picker.component";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {DateInterval} from "./date-interval.model";
import {CashierClosureHistoryService} from "./cashier-closure-history.service";
import {Observable, scan, startWith, Subject} from "rxjs";
import {DetailedCashierClosure} from "./detailed-cashier-closure";
import {tap} from "rxjs/operators";


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
        AsyncPipe,
    ],
    templateUrl: './cashier-closure-history.component.html',
    standalone: true,
    styleUrl: './cashier-closure-history.component.css'
})
export class CashierClosureHistoryComponent {

    constructor(private readonly cashierClosureHistoryService: CashierClosureHistoryService) {
    }

    protected cashierClosures: Observable<DetailedCashierClosure[]>;

    protected total: Observable<number>;

    protected displayedColumns = ['cardSales', 'cashSales', 'deposit', 'withdrawal', 'finalCash', 'comment'];

    updateDataset($event: DateInterval) {
        let runningSum = new Subject<number>()
        this.cashierClosures = this.cashierClosureHistoryService.findCahierClosuresByDateBetween($event.start, $event.end)
            .pipe(tap(array => array.forEach(item => runningSum.next(item.cashSales + item.cardSales))));
        this.total = runningSum
            .pipe(startWith(0)) //Start with zero to avoid empty scan if search doesn't return any result
            .pipe(scan((acc, cur) => acc + cur, 0));
    }
}
