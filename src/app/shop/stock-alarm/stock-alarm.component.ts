import {Component} from "@angular/core";
import {of} from "rxjs";
import {StockAlarmService} from "./stock-alarm.service";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {StockAlarm} from "../shared/services/models/stock-alarm.model";
import {StockAlarmDialogComponent} from "./stock-alarm-dialog/stock-alarm-dialog.component";
import {StockAlarmSearch} from "./stock-alarm-search.model";

@Component({
  templateUrl: 'stock-alarm.component.html'
})

export class StockAlarmComponent {
  title = 'Stock Alarms';
  stockAlarmSearch: StockAlarmSearch;
  stockAlarms = of([]);

  constructor(private dialog: MatDialog,
              private stockAlarmService: StockAlarmService) {
    this.resetSearch();
    this.loadStockAlarms();
  }

  loadStockAlarms(): void {
    this.stockAlarms = this.stockAlarmService.readAll();
  }

  search(): void {

    if (this.stockAlarmSearch.warning || this.stockAlarmSearch.critical) {
      this.stockAlarms = this.stockAlarmService.findByFilter(this.stockAlarmSearch);
    } else {
      this.loadStockAlarms();
    }
  }

  resetSearch(): void {
    this.stockAlarmSearch = {
      warning: false,
      critical: false
    };
  }

  create(): void {
    this.dialog.open(StockAlarmDialogComponent);
  }

  read(stockAlarm: StockAlarm): void {
    console.log(this.stockAlarmService.read(stockAlarm));
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: "Stock Alarm Details",
        object: this.stockAlarmService.read(stockAlarm)
      }
    });
  }

  update(stockAlarm: StockAlarm): void {
    this.stockAlarmService.read(stockAlarm)
      .subscribe(fullStockAlarm => this.dialog.open(StockAlarmDialogComponent, {data: fullStockAlarm})
        .afterClosed()
        .subscribe(() => this.search())
      );
  }

}
