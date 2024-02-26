import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {StockAlarm} from "../shared/services/models/stock-alarm.model";
import {StockAlarmLine} from "../shared/services/models/stock-alarm-line.model";
import {StockAlarmSearch} from "./stock-alarm-search.model";

@Injectable({
  providedIn: 'root',
})
export class StockAlarmService {

  private singleStockAlarm: StockAlarm = {
    name: "Smartphones",
    description: "Se incluyen sólo la última generación de cada marca",
    warning: 1000,
    critical: 100,
    stockAlarmLines: [
      {
        article: {
          barcode: "298729862",
          description: "Iphone 15",
          retailPrice: 1100,
          providerCompany: "Apple"
        },
        warning: 75,
        critical: 10
      },
      {
        article: {
          barcode: "349867269",
          description: "Samsung Galaxy S24",
          retailPrice: 1050,
          providerCompany: "Samsung"
        },
        warning: 50,
        critical: 5
      },
      {
        article: {
          barcode: "285623756",
          description: "Xiaomi 14",
          retailPrice: 850,
          providerCompany: "Xiaomi"
        },
        warning: 150,
        critical: 15
      },
    ]
  }

  private mockStockAlarms: StockAlarm[] = [
    { name: "Smartphones",
      description: "Se incluyen sólo la última generación de cada marca",
      warning: 1000,
      critical: 100,
      stockAlarmLines: [
        {
          article: {
            barcode: "298729862",
            description: "Iphone 15",
            retailPrice: 1100,
            providerCompany: "Apple"
          },
          warning: 75,
          critical: 10
        },
        {
          article: {
            barcode: "349867269",
            description: "Samsung Galaxy S24",
            retailPrice: 1050,
            providerCompany: "Samsung"
          },
          warning: 50,
          critical: 5
        },
        {
          article: {
            barcode: "285623756",
            description: "Xiaomi 14",
            retailPrice: 850,
            providerCompany: "Xiaomi"
          },
          warning: 150,
          critical: 15
        },
      ]
    },
    {
      name: "Alarma de prueba",
      description: "Sin descripción",
      warning: 20,
      critical: 10,
      stockAlarmLines: []
    },
    ];

  constructor() {}

  getStockAlarms(): Observable<StockAlarm[]> {
    return of(this.mockStockAlarms);
  }

  getLinesByStockAlarm(stockAlarm: StockAlarm): Observable<StockAlarmLine[]> {
    return of(stockAlarm.stockAlarmLines);
  }

  read(stockAlarm: StockAlarm) {
    return of(stockAlarm);
  }

  update(stockAlarm: StockAlarm) {
    return of(this.singleStockAlarm);
  }

  create(stockAlarm: StockAlarm) {
    this.mockStockAlarms.push(stockAlarm);
    return of(this.mockStockAlarms);
  }

  search(stockAlarmSearch: StockAlarmSearch) {
    return of(this.mockStockAlarms);
  }

}
