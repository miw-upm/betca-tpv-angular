import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StockAlarmService} from "../stock-alarm.service";
import {StockAlarm} from "../../shared/services/models/stock-alarm.model";
import {StockAlarmLineDialogComponent} from "../stock-alarm-line-dialog/stock-alarm-line-dialog.component";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {StockAlarmLine} from "../../shared/services/models/stock-alarm-line.model";
import {StockAlarmLineService} from "../stock-alarm-line.service";

@Component({
  templateUrl: 'stock-alarm-dialog.component.html',
  styleUrls: ['stock-alarm-dialog.component.css']
})
export class StockAlarmDialogComponent {
  stockAlarm: StockAlarm;
  stockAlarmLines: any;
  title: string;
  crudTitle: string = 'Stock Alarm Lines';
  oldName: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: StockAlarm,
              private stockAlarmService: StockAlarmService,
              private stockAlarmLineService: StockAlarmLineService,
              private dialog: MatDialog) {
    this.title = data ? "Update Stock Alarm" : "Create Stock Alarm";
    this.stockAlarm = data ? data : {
      name: undefined,
      description: undefined,
      warning: 0,
      critical: 0,
      stockAlarmLines: []
    };
    console.log(this.stockAlarm);
    this.oldName = this.stockAlarm.name;
    console.log(this.oldName);
    this.stockAlarmLines = this.stockAlarmService.getLinesByStockAlarm(this.stockAlarm);
  }

  create(): void {
    this.stockAlarmService
      .create(this.stockAlarm)
      .subscribe(() => this.dialog.closeAll());
  }

  update() {
    this.stockAlarmService
      .update(this.stockAlarm)
      .subscribe(() => this.dialog.closeAll());
  }

  createAlarmLine() {
    this.dialog.open(StockAlarmLineDialogComponent);
  }

  updateAlarmLine(stockAlarmLine: StockAlarmLine) {
    this.stockAlarmLineService.read(stockAlarmLine)
      .subscribe(fullStockAlarmLine =>
        this.dialog.open(StockAlarmLineDialogComponent, {data: fullStockAlarmLine})
          .afterClosed()
          .subscribe(() => this.stockAlarm.stockAlarmLines.push(fullStockAlarmLine))
      );
  }

  readAlarmLine(stockAlarm: StockAlarm) {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: "Alarm Line Details",
        object: this.stockAlarmService.read(stockAlarm)
      }
    });
  }

  invalid(): boolean {
    return this.checkString(this.stockAlarm.name)
      || this.checkNumber(this.stockAlarm.warning)
      || this.checkNumber(this.stockAlarm.critical);
  }

  isCreate() {
    return this.oldName === undefined;
  }

  private checkString(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

  private checkNumber(attr: number): boolean {
    return attr === undefined || null || attr < 0;
  }

}
