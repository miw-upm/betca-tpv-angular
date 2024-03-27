import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StockAudit} from "../../shared/services/models/stock-audit.model";
import {StockAuditService} from "../stock-audit.service";
import {ArticleLoss} from "../../shared/services/models/article-loss.model";
import {Observable, of} from "rxjs";
import {Article} from "../../shared/services/models/article.model";

@Component({
  templateUrl: './stock-audit-dialog.component.html'
})
export class StockAuditDialogComponent {
  stockAudit: StockAudit;
  stockAuditEdited: StockAudit;
  articlesWithoutAudit: Observable<Article[]>;
  articlesLosses: Observable<ArticleLoss[]>;
  title: string = 'Audit existing stock';
  titleLosses: string = 'Articles losses';

  constructor(@Inject(MAT_DIALOG_DATA) data: StockAudit,
              private dialog: MatDialog,
              private stockAuditService: StockAuditService) {
    this.stockAudit = data;
    // Copia profunda del objeto por no instalar loadash
    this.stockAuditEdited = JSON.parse(JSON.stringify(this.stockAudit));

    this.articlesWithoutAudit = of(this.stockAudit.articlesWithoutAudit);
    this.articlesLosses = of(this.stockAudit.articlesLosses);
  }

  save(): void {
    this.updateStockAudit();
    this.stockAuditService
      .update(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }

  closeAudit(): void {
    this.updateStockAudit();
    this.stockAuditService
      .close(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }

  auditArticle(article: Article, realStockString: string): void {
    let realStock: number = parseInt(realStockString);
    let theoricalStock: number = article.stock ? article.stock : 0;
    let articleAmountLosses = theoricalStock - realStock;

    // Quitar el articulo de la lista de articulos sin auditar
    this.stockAuditEdited.articlesWithoutAudit = this.stockAuditEdited.articlesWithoutAudit.filter(a => a.barcode !== article.barcode);
    this.articlesWithoutAudit = of(this.stockAuditEdited.articlesWithoutAudit);

    // Agregar el articulo a la lista de articulos con perdida
    if(articleAmountLosses > 0){
      this.stockAuditEdited.articlesLosses = this.stockAuditEdited.articlesLosses.concat({barcode: article.barcode, amount: articleAmountLosses});
      this.articlesLosses = of(this.stockAuditEdited.articlesLosses);
    }

    // Calcular la perdida
    this.stockAuditEdited.lossValue += articleAmountLosses * article.retailPrice;
  }

  updateStockAudit(): void {
    this.stockAudit.articlesWithoutAudit = this.stockAuditEdited.articlesWithoutAudit;
    this.stockAudit.articlesLosses = this.stockAuditEdited.articlesLosses;
    this.stockAudit.lossValue = this.stockAuditEdited.lossValue;
  }
}
