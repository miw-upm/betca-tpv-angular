import {Component, Inject, OnInit} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {LineInterface, StockAlarm} from "../../models/stock-alarm.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {MatDivider} from "@angular/material/divider";
import {StockAlarmLineCreateUpdateComponent} from "../stock-alarm-line-create-update/stock-alarm-line-create-update.component";
import {StockAlarmLine} from "../../models/stock-alarm-line.model";
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {ArticleService} from "../../../articles/article.service";

@Component({
    selector: 'app-stock-alarm-details',
    imports: [
        CrudComponent,
        MatDivider,
        MatDialogContent
    ],
    templateUrl: './stock-alarm-details.component.html',
    styleUrl: './stock-alarm-details.component.css',
    standalone: true
})
export class StockAlarmDetailsComponent implements OnInit {
    stockAlarm: StockAlarm;
    stockAlarmLines: Observable<StockAlarmLine[]>;
    formattedStockAlarmLines:Observable<LineInterface[]>;
    title: string;
    titleLine: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: StockAlarm,
        private dialog: MatDialog,
        private articleService: ArticleService,
    ) {
        this.stockAlarm = data;
        this.title = "Stock Alarm Details";
        this.titleLine = "Lines";
    }

    ngOnInit() {
        this.stockAlarmLines = of(this.stockAlarm?.stockAlarmLines ?? []);
        this.formattedStockAlarmLines = this.stockAlarmLines.pipe(
            map(items => (items ?? []).map(item => ({
                barcode: item.article?.barcode || 'N/A',
                stock: item.article?.stock || 0,
                warning: item.warning || 0,
                critical: item.critical || 0
            })))
        );
    }

    create() {
        this.dialog.open(StockAlarmLineCreateUpdateComponent, {
            data: {
                stockAlarm: this.stockAlarm,
            }
        });
    }

    read(stockAlarmLineInterface: LineInterface) {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Article Details',
                object: this.articleService.read(stockAlarmLineInterface.barcode)
            },
        });
    }

    update(stockAlarmLineInterface: LineInterface) {
        this.dialog.open(StockAlarmLineCreateUpdateComponent, {
            data: {
                stockAlarm: this.stockAlarm,
                stockAlarmLineInterface: stockAlarmLineInterface
            }
        });
    }
}