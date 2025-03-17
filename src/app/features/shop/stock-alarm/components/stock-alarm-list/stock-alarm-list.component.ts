import {Component,OnInit} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {StockAlarm} from "../../models/stock-alarm.model";
import {MatDialog} from "@angular/material/dialog";
import {StockAlarmService} from "../../services/stock-alarm-service";
import {StockAlarmDetailsComponent} from "../stock-alarm-details/stock-alarm-details.component";
import {StockAlarmCreateUpdateComponent} from "../stock-alarm-create-update/stock-alarm-create-update.component";

@Component({
    selector: 'app-stock-alarm-list',
    imports: [
        CrudComponent
    ],
    templateUrl: './stock-alarm-list.component.html',
    styleUrl: './stock-alarm-list.component.css',
    standalone: true
})
export class StockAlarmListComponent implements OnInit {
    stockAlarms: Observable<StockAlarm[]> = of([]);
    title = "Stock Alarms";

    constructor(private dialog: MatDialog, private stockAlarmService: StockAlarmService) {
    }

    ngOnInit() {
        this.findAll();
    }

    create() {
        this.dialog.open(StockAlarmCreateUpdateComponent);
    }

    read(stockAlarm: StockAlarm) {
        this.dialog.open(StockAlarmDetailsComponent, {
            data: stockAlarm
        });
    }

    update(stockAlarm: StockAlarm) {
        this.dialog.open(StockAlarmCreateUpdateComponent, {
            data: stockAlarm
        });
    }

    findAll(): void {
        this.stockAlarms = this.stockAlarmService.findAll();
    }
}