import { Component } from '@angular/core';
import {StockAlarmListComponent} from "./components/stock-alarm-list/stock-alarm-list.component";

@Component({
    selector: 'app-stock-alarm',
    imports: [
        StockAlarmListComponent
    ],
    templateUrl: './stock-alarm.component.html',
    styleUrl: './stock-alarm.component.css',
    standalone: true
})
export class StockAlarmComponent {}