import {Component, Inject, OnInit} from "@angular/core";
import {CrudComponent} from "@common/components/crud.component";
import {MatDivider} from "@angular/material/divider";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent} from "@angular/material/dialog";
import {StockAlarmLine} from "../../models/stock-alarm-line.model";
import {LineInterface} from "../../models/stock-alarm.model";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {ArticleService} from "../../../articles/article.service";

@Component({
    selector: 'app-stock-alarm-search',
    imports: [
        CrudComponent,
        MatDivider,
        MatDialogContent
    ],
    templateUrl: './stock-alarm-search.component.html',
    styleUrl: './stock-alarm-search.component.css',
    standalone: true
})
export class StockAlarmSearchComponent implements OnInit {
    stockAlarmLines: Observable<StockAlarmLine[]>;
    formattedStockAlarmLines: Observable<LineInterface[]>;
    title: string;
    titleLine: string;
    constructor(@Inject(MAT_DIALOG_DATA) data: { stockAlarmLines: StockAlarmLine[], search: string },
                private dialog: MatDialog,
                private articleService: ArticleService) {
        this.stockAlarmLines = of(data.stockAlarmLines ?? []);
        this.title = (data.search == "warning") ? "Search Warnings" : "Search Criticals";
        this.titleLine = "Lines";
    }

    ngOnInit() {
        this.formattedStockAlarmLines = this.stockAlarmLines.pipe(
            map(items => (items ?? []).map(item => ({
                barcode: item.article?.barcode || 'N/A',
                stock: item.article?.stock || 0,
                warning: item.warning || 0,
                critical: item.critical || 0
            })))
        );
    }

    read(stockAlarmLineInterface: LineInterface) {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Article Details',
                object: this.articleService.read(stockAlarmLineInterface.barcode)
            },
        });
    }
}