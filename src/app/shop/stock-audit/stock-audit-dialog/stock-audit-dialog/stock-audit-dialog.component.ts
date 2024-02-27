import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StockAudit} from "../../../shared/services/models/stock-audit.model";
import {StockAuditService} from "../../stock-audit.service";
import {ArticleLoss} from "../../../shared/services/models/articleLoss.model";
import {Observable, of} from "rxjs";
import {Article} from "../../../shared/services/models/article.model";

@Component({
  selector: 'app-stock-audit-dialog',
  templateUrl: './stock-audit-dialog.component.html'
})
export class StockAuditDialogComponent {
  stockAudit: StockAudit;
  articlesWithoutAudit: Observable<Article[]>;
  articlesLosses: Observable<ArticleLoss[]>;
  title: string;
  titleNoAudit: string = 'Articles without audit';
  titleLosses: string = 'Articles losses';
  constructor(@Inject(MAT_DIALOG_DATA) data: StockAudit,
              private dialog: MatDialog,
              private stockAuditService: StockAuditService) {
    this.title = data ? "Update Stock Audit" : "Create Stock Audit";
    this.stockAudit = data ? data : { creationDate: new Date('2020-01-01'), closeDate: null, articlesWithoutAudit: [
        {
          barcode: "123456789",
          description: "Champoo",
          retailPrice: 12,
          providerCompany: "Johnson & Johnson",
        },
        {
          barcode: "987654321",
          description: "Pasta de dientes",
          retailPrice: 8,
          providerCompany: "Colgate",
        },
        {
          barcode: "456789123",
          description: "Cepillo de dientes",
          retailPrice: 5,
          providerCompany: "Oral-B",
        }
      ], lossValue: 0, losses: [] };
    this.articlesWithoutAudit = of(this.stockAudit.articlesWithoutAudit);
    this.articlesLosses = of(this.stockAudit.losses);
  }
  create(): void {
    this.stockAuditService
      .create(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }
}
