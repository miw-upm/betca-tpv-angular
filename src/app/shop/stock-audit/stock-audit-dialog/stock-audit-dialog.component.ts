import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StockAudit} from "../../shared/services/models/stock-audit.model";
import {StockAuditService} from "../stock-audit.service";
import {ArticleLoss} from "../../shared/services/models/articleLoss.model";
import {Observable, of} from "rxjs";
import {Article} from "../../shared/services/models/article.model";
import {AuditArticleDialogComponent} from "../audit-article-dialog/audit-article-dialog/audit-article-dialog.component";

@Component({
  templateUrl: './stock-audit-dialog.component.html'
})
export class StockAuditDialogComponent {
  stockAudit: StockAudit;
  articlesWithoutAudit: Observable<Article[]>;
  articlesLosses: Observable<ArticleLoss[]>;
  title: string;
  titleNoAudit: string = 'Articles without audit';
  titleLosses: string = 'Articles losses';
  oldDate: Date;

  constructor(@Inject(MAT_DIALOG_DATA) data: StockAudit,
              private dialog: MatDialog,
              private stockAuditService: StockAuditService) {
    this.title = data ? "Update Stock Audit" : "Create Stock Audit";
    this.stockAudit = data ? data : {
      creationDate: null,
      closeDate: null,
      articlesWithoutAudit: [],
      lossValue: 0,
      losses: []
    };
    this.oldDate = this.stockAudit.creationDate;
    this.articlesWithoutAudit = of(this.stockAudit.articlesWithoutAudit);
    this.articlesLosses = of(this.stockAudit.losses);
  }
  create(): void {
    this.stockAuditService
      .create(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }

  save(): void {
    this.stockAuditService
      .update(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }

  closeAudit(): void {
    this.stockAuditService
      .closeAudit(this.stockAudit)
      .subscribe(() => this.dialog.closeAll());
  }

  isCreated(): boolean {
    return this.oldDate === null;
  }

  auditArticle(article: Article): void {
    console.log(article)
    this.dialog.open(AuditArticleDialogComponent, {
      width: '60%',
      data: article
    })
      .afterClosed()
      .subscribe()
  }
}
