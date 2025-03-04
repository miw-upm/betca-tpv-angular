import {Injectable} from "@angular/core";
import {StockAlarm} from "../models/stock-alarm.model";
import {Observable, of} from "rxjs";

@Injectable({providedIn: "root"})
export class StockAlarmService {
    private mockStockAlarm: StockAlarm[];

    constructor() {
        this.mockData();
    }

    mockData() {
        this.mockStockAlarm = [
            {
                name: 'Alarm 1',
                description: 'Important alarm',
                warning: 8,
                critical: 9,
                stockAlarmLines: [{
                    article: {
                        barcode: '0001',
                        description: 'It is article 1',
                        retailPrice: 4,
                        providerCompany: 'Company'
                    },
                    warning: 8,
                    critical: 7
                }]
            },
            {
                name: 'Alarm 2',
                description: 'Non Important alarm',
                warning: 2,
                critical: 4,
                stockAlarmLines: [{
                    article: {
                        barcode: '0002',
                        description: 'It is article 2',
                        retailPrice: 4,
                        providerCompany: 'Company'
                    },
                    warning: 8,
                    critical: 7
                },{
                    article: {
                        barcode: '0003',
                        description: 'It is article 3',
                        retailPrice: 5,
                        providerCompany: 'Company'
                    },
                    warning: 8,
                    critical: 7
                }]
            }
        ]
    }

    create(stockAlarm: StockAlarm): Observable<StockAlarm> {
        return of(stockAlarm);
    }

    getAllStockAlarms(): Observable<StockAlarm[]> {
        return of(this.mockStockAlarm);
    }
}