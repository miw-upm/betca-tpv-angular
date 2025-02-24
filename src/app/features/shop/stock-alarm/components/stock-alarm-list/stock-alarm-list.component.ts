import {Component} from '@angular/core';
import {CrudComponent} from "@common/components/crud.component";
import {Observable, of} from "rxjs";
import {StockAlarm} from "../../models/stock-alarm.model";

@Component({
    selector: 'app-stock-alarm-list',
    imports: [
        CrudComponent
    ],
    templateUrl: './stock-alarm-list.component.html',
    styleUrl: './stock-alarm-list.component.css',
    standalone: true
})
export class StockAlarmListComponent {
    stockAlarms:Observable<StockAlarm[]> = of([{
        name: "Alarm 1",
        description: "Important Alarm",
        warning: 6,
        critical: 9,
        stockAlarmLines: []
    }]);
    title = "Stock Alarms";

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