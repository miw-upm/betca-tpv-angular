import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {StockAlarmLine} from "../shared/services/models/stock-alarm-line.model";

@Injectable({
  providedIn: 'root',
})
export class StockAlarmLineService {

  private mockStockAlarmLine: StockAlarmLine = {
    article: {
      barcode: "298729862",
      description: "Iphone 15",
      retailPrice: 1100,
      providerCompany: "Apple"
    },
    warning: 75,
    critical: 10
  };

  constructor() {
  }

  create(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(this.mockStockAlarmLine);
  }

  update(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(this.mockStockAlarmLine);
  }

  read(line: StockAlarmLine): Observable<StockAlarmLine> {
    return of(this.mockStockAlarmLine);
  }


}
