import { Component, OnInit } from '@angular/core';
import {ArticleCreationUpdatingDialogComponent} from "../articles/article-creation-updating-dialog.component";
import {Article} from "../shared/services/models/article.model";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {CashierClosureService} from "../cashier-opened/cashier-closure/cashier-closure.service";
import {CashierClosure} from "../cashier-opened/cashier-closure/cashier-closure.model";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-cashier-closure',
  templateUrl: './cashier-closure.component.html',
  styleUrls: ['./cashier-closure.component.css']
})
export class CashierClosureComponent {
  title: string = "Cashier Closures"
  cashierClosures: Observable<CashierClosure[]>;
  constructor(private cashierClosureService: CashierClosureService) {
    this.search();
  }

  search(): void {
    this.cashierClosures = this.cashierClosureService.readAllClosed();
  }

  resetSearch(): void {
    this.cashierClosures = of([]);
  }
/*
  read(article: Article): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Article Details',
        object: this.articleService.read(article.barcode)
      }
    });
  }*/
}
