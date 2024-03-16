import { Component, OnInit } from '@angular/core';
import {ArticleCreationUpdatingDialogComponent} from "../articles/article-creation-updating-dialog.component";
import {Article} from "../shared/services/models/article.model";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {CashierClosureService} from "../cashier-opened/cashier-closure/cashier-closure.service";
import {CashierClosure} from "../cashier-opened/cashier-closure/cashier-closure.model";
import {Observable, of, toArray} from "rxjs";
import {Cashier} from "./cashier.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cashier-closure',
  templateUrl: './cashier-closure.component.html',
  styleUrls: ['./cashier-closure.component.css']
})
export class CashierClosureComponent {
  title: string = "Cashier Closures"
  cashiers: Observable<Cashier[]>;
  total: Observable<number>;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  currentMonth: number;
  currentYear: number;

  constructor(private cashierClosureService: CashierClosureService) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();

    this.search();
    this.calculateTotalIncoming();
  }

  search(): void {
    this.cashiers = this.cashierClosureService.readAll();
  }

  resetSearch(): void {
    this.cashiers = of([]);
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
  searchCurrentMonth() {

  }

  searchByYear() {

  }

  searchBySpecificMonth() {

  }

  searchBySpecificYear() {

  }

  readAll() {
    this.cashiers = this.cashierClosureService.readAll();
  }

  readClosed() {
    this.cashiers = this.cashierClosureService.readClosed();
  }

  calculateTotalIncoming(): void {
    this.total = of(100);
  }

  generateYearList(): number[] {
    const years: number[] = [];
    /*this.cashierClosureService.findFirstClosureYear()*/
    for (let year = 2000; year <= this.currentYear; year++) {
      years.push(year);
    }
    return years;
  }
}
