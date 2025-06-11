import {Component, Inject} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {StockAlarmService} from "../../services/stock-alarm-service";
import {LineInterface, StockAlarm} from "../../models/stock-alarm.model";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ArticleService} from "../../../articles/article.service";

@Component({
    selector: 'app-stock-alarm-line-create-update',
    imports: [
        MatDialogTitle,
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf
    ],
    templateUrl: './stock-alarm-line-create-update.component.html',
    styleUrl: './stock-alarm-line-create-update.component.css',
    standalone: true
})
export class StockAlarmLineCreateUpdateComponent {
    stockAlarm: StockAlarm;
    stockAlarmLineInterface: LineInterface;
    title: string;
    barcode: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: {stockAlarm: StockAlarm, stockAlarmLineInterface: LineInterface},
                public dialog: MatDialog,
                private stockAlarmService: StockAlarmService,
                private articleService: ArticleService) {
        this.title = data ? 'Update Stock Alarm Line' : 'Create Stock Alarm Line';
        this.stockAlarm = data.stockAlarm || undefined;
        this.stockAlarmLineInterface = data.stockAlarmLineInterface || {
            barcode: undefined, stock: undefined, warning: undefined, critical: undefined
        };
        if(this.stockAlarmLineInterface.barcode !== undefined) {
            this.barcode = data.stockAlarmLineInterface.barcode;
        } else {
            this.barcode = undefined;
        }
    }

    create() {
        this.articleService.read(this.stockAlarmLineInterface.barcode).subscribe(data => {
            let stockAlarmLineNew = {article: data,
                warning: this.stockAlarmLineInterface.warning,
                critical: this.stockAlarmLineInterface.critical};
            this.stockAlarm.stockAlarmLines = [...(this.stockAlarm.stockAlarmLines || []), stockAlarmLineNew];
            this.stockAlarmService
                .updateLines(this.stockAlarm.name, this.stockAlarm)
                .subscribe((data2) => {
                    this.dialog.closeAll();
                });
        });
    }

    update() {
        const index = this.stockAlarm.stockAlarmLines
            .findIndex(line => line.article?.barcode === this.barcode);

        if (index !== -1) {
            this.stockAlarm.stockAlarmLines[index].warning = this.stockAlarmLineInterface.warning;
            this.stockAlarm.stockAlarmLines[index].critical = this.stockAlarmLineInterface.critical;

            this.stockAlarmService
                .updateLines(this.stockAlarm.name, this.stockAlarm)
                .subscribe((data) => {
                    this.dialog.closeAll();
                });
        }
    }

    isCreate(): boolean {
        return this.barcode === undefined;
    }

    invalid(): boolean {
        return this.check(this.stockAlarm.name) || this.check(this.stockAlarm.description)
            || this.checkNumber(this.stockAlarm.warning)  || this.checkNumber(this.stockAlarm.critical);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }

    checkNumber(attr: number): boolean {
        return attr === undefined || attr === null || isNaN(attr);
    }
}