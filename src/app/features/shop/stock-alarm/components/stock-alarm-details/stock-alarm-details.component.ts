import {Component, OnInit} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {StockAlarmLine} from "../../models/stock-alarm-line.model";
import {StockAlarm} from "../../models/stock-alarm.model";

@Component({
    selector: 'app-stock-alarm-details',
    imports: [
        CrudComponent
    ],
    templateUrl: './stock-alarm-details.component.html',
    styleUrl: './stock-alarm-details.component.css',
    standalone: true
})
export class StockAlarmDetailsComponent implements OnInit {
    stockAlarm: StockAlarm;
    stockAlarmLines:Observable<StockAlarmLine[]>;
    title = "Stock Alarm";

    ngOnInit() {
        this.stockAlarmLines = of(this.stockAlarm.stockAlarmLines)
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