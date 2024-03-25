import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {StockAlarmLine} from "../shared/services/models/stock-alarm-line.model";

@Injectable({
  providedIn: 'root',
})
export class StockAlarmLineService {

  constructor() {
  }

  create(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(line);
  }

  update(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(line);
  }

  read(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(line);
  }


}
