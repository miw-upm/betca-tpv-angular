import {Injectable} from "@angular/core";
import {StockAlarm} from "../models/stock-alarm.model";
import {Observable} from "rxjs";
import {HttpService} from "@core/services/http.service";
import {EndPoints} from "@core/end-points";

@Injectable({providedIn: "root"})
export class StockAlarmService {

    constructor(private httpService: HttpService) {
    }

    create(stockAlarm: StockAlarm): Observable<StockAlarm> {
        return this.httpService.post(EndPoints.STOCK_ALARMS, stockAlarm);
    }

    findAll(): Observable<StockAlarm[]> {
        this.httpService.get(EndPoints.STOCK_ALARMS).subscribe(data => {
            console.log(data);
        })
        return this.httpService.get(EndPoints.STOCK_ALARMS);
    }
}