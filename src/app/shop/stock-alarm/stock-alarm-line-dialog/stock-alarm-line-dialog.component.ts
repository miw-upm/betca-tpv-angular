import {Article} from "../../shared/services/models/article.model";
import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StockAlarmLine} from "../../shared/services/models/stock-alarm-line.model";
import {StockAlarmLineService} from "../stock-alarm-line.service";
import {ArticleService} from "../../articles/article.service";

@Component({
  templateUrl: 'stock-alarm-line-dialog.component.html',
})
export class StockAlarmLineDialogComponent {
  article: Article;
  stockAlarmLine: StockAlarmLine;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: StockAlarmLine,
              private stockAlarmLineService: StockAlarmLineService,
              private articleService: ArticleService,
              private dialog: MatDialogRef<StockAlarmLineDialogComponent>) {
    this.title = data ? "Update Stock Alarm Line" : "Create Stock Alarm Line";
    this.stockAlarmLine = data ? data : {
      article: {
        barcode: undefined,
        description: undefined,
        retailPrice: undefined,
        providerCompany: undefined
      },
      warning: 0,
      critical: 0,
    };
  }

  create(): void {
    this.stockAlarmLineService
      .create(this.stockAlarmLine)
      .subscribe(() => this.dialog.close());
  }

  update(): void {
    this.stockAlarmLineService
      .update(this.stockAlarmLine)
      .subscribe(() => this.dialog.close());
  }

  addBarcode(barcode: string): void {
    this.articleService
      .read(barcode)
      .subscribe(article => {
          this.stockAlarmLine.article = article;
        }
      );
  }

  invalid(): boolean {
    return this.checkNumber(this.stockAlarmLine.warning)
      || this.checkNumber(this.stockAlarmLine.critical);
  }

  private checkString(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

  private checkNumber(attr: number): boolean {
    return attr === undefined || null || attr < 0;
  }

  isCreate(): boolean {
    return this.stockAlarmLine.warning === 0 && this.stockAlarmLine.critical === 0 && this.stockAlarmLine.article.barcode === undefined;
  }

}
