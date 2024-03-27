import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {StockAlarm} from "../shared/services/models/stock-alarm.model";
import {StockAlarmLine} from "../shared/services/models/stock-alarm-line.model";
import {StockAlarmSearch} from "./stock-alarm-search.model";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class StockAlarmService {

  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {}

  getLinesByStockAlarm(stockAlarm: StockAlarm): Observable<StockAlarmLine[]> {
    return of(stockAlarm.stockAlarmLines);
  }

  readAll(): Observable<StockAlarm[]> {
    return this.httpService
      .get(EndPoints.STOCK_ALARMS);
  }

  read(stockAlarm: StockAlarm) {
    return of(stockAlarm);
  }

  // TODO pendiente de realizar el filtrado
  findByFilter(stockAlarmSearch: StockAlarmSearch) {
    const stockAlarmSearchInstance: StockAlarmSearch = { ...stockAlarmSearch };
    stockAlarmSearchInstance.critical = stockAlarmSearch.critical ? stockAlarmSearch.critical.valueOf() : undefined;
    stockAlarmSearchInstance.warning = stockAlarmSearch.warning ? stockAlarmSearch.warning.valueOf() : undefined;

    return this.readAll();
  }

  update(stockAlarm: StockAlarm) {
    return of(stockAlarm);
  }

  create(stockAlarm: StockAlarm) {
    // this.mockStockAlarms.push(stockAlarm);
    return of(stockAlarm);
  }

}
