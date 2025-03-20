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

    read(name: string): Observable<StockAlarm> {
        return this.httpService.get(EndPoints.STOCK_ALARMS + '/' + name);
    }

    findAll(): Observable<StockAlarm[]> {
        return this.httpService.get(EndPoints.STOCK_ALARMS);
    }

    update(name: String, stockAlarm: StockAlarm): Observable<StockAlarm> {
        return this.httpService
            .successful()
            .put(EndPoints.STOCK_ALARMS + '/' + name, stockAlarm);
    }

    updateLines(name: String, stockAlarm: StockAlarm): Observable<StockAlarm> {
        return this.httpService
            .successful()
            .put(EndPoints.STOCK_ALARMS + '/' + name + '/lines', stockAlarm);
    }
}