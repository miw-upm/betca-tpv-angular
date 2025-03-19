import {Component, Inject, OnInit} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {StockAlarmLine} from "../../models/stock-alarm-line.model";
import {StockAlarm} from "../../models/stock-alarm.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {MatDivider} from "@angular/material/divider";

@Component({
    selector: 'app-stock-alarm-details',
    imports: [
        CrudComponent,
        MatDivider
    ],
    templateUrl: './stock-alarm-details.component.html',
    styleUrl: './stock-alarm-details.component.css',
    standalone: true
})
export class StockAlarmDetailsComponent implements OnInit {
    stockAlarm: StockAlarm;
    stockAlarmLines:Observable<StockAlarmLine[]>;
    formattedStockAlarmLines:Observable<{ article: string; warning: number; critical: number }[]>;
    title = "Stock Alarm Details";
    titleLine = "Lines";
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: StockAlarm
    ) {
        this.stockAlarm = data;
    }

    ngOnInit() {
        this.stockAlarmLines = of(this.stockAlarm.stockAlarmLines)
        this.formattedStockAlarmLines = this.stockAlarmLines.pipe(
            map(items => items.map(item => ({
                ...item,
                article: item.article?.barcode || 'N/A'
            })))
        );
    }

    create() {
        throw new Error("Method not implemented.");
    }

    read($event: any) {
        throw new Error("Method not implemented.");
    }

    update($event: any) {
        throw new Error("Method not implemented.");
    }
}