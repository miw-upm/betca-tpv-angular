import {Component,OnInit} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {StockAlarm} from "./models/stock-alarm.model";
import {StockAlarmService} from "./services/stock-alarm-service";
import {
    StockAlarmCreateUpdateComponent
} from "./components/stock-alarm-create-update/stock-alarm-create-update.component";
import {StockAlarmDetailsComponent} from "./components/stock-alarm-details/stock-alarm-details.component";

@Component({
    selector: 'app-stock-alarm',
    imports: [
        CrudComponent
    ],
    templateUrl: './stock-alarm.component.html',
    styleUrl: './stock-alarm.component.css',
    standalone: true
})
export class StockAlarmComponent implements OnInit {
    stockAlarms: Observable<StockAlarm[]>;
    formattedStockAlarms: Observable<StockAlarm[]>;
    title: string;

    constructor(private dialog: MatDialog, private stockAlarmService: StockAlarmService) {
        this.title = "Stock Alarms";
    }

    ngOnInit() {
        this.findAll();
    }

    findAll(): void {
        this.stockAlarms = this.stockAlarmService.findAll() ?? of([]);

        this.formattedStockAlarms = this.stockAlarms.pipe(
            map(items => (items ? items.map(item => ({
                name: item.name,
                description: item.description,
                warning: item.warning,
                critical: item.critical
            })) : []))
        );
    }

    create() {
        this.dialog.open(StockAlarmCreateUpdateComponent);
    }

    read(stockAlarm: StockAlarm) {
        this.stockAlarmService.read(stockAlarm.name).subscribe((data) => {
            this.dialog.open(StockAlarmDetailsComponent, {
                data: data
            });
        });
    }

    update(stockAlarm: StockAlarm) {
        this.dialog.open(StockAlarmCreateUpdateComponent, {
            data: stockAlarm
        });
    }
}