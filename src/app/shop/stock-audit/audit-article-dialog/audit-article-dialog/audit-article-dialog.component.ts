import {Component, Inject} from '@angular/core';
import {Article} from "../../../shared/services/models/article.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StockAlarmLineService} from "../../../stock-alarm/stock-alarm-line.service";
import {ArticleService} from "../../../articles/article.service";

@Component({
  templateUrl: './audit-article-dialog.component.html'
})
export class AuditArticleDialogComponent {
  article: Article;
  realStock: number;
  title: string = 'Audit Article';

  constructor(@Inject(MAT_DIALOG_DATA) data: Article,
              private dialog: MatDialog,
              private stockAuditService: StockAlarmLineService,
              private articleService: ArticleService) {
    console.log(data);
    this.article = data;
  }

}
