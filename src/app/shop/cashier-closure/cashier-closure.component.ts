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

  monthFiltering: boolean;
  yearFiltering: boolean;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  currentMonth: number;
  currentYear: number;

  constructor(private cashierClosureService: CashierClosureService) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.monthFiltering = false;
    this.yearFiltering = false;

    this.searchCashierClosures();
    this.calculateTotalIncoming();
  }

  resetSearch(): void {
    this.cashiers = of([]);
  }

  searchCashierClosures(): void {
    if (this.monthFiltering && this.yearFiltering) {
      // this.cashiers = this.cashierClosureService.readBydMonthAndYear();
    } else if (this.monthFiltering) {
      // this.cashiers = this.cashierClosureService.readByMonth();
    } else if (this.yearFiltering) {
      // this.cashiers = this.cashierClosureService.readByYear();
    } else {
      this.cashiers = this.cashierClosureService.readAll();
    }
  }

  readAll() {
    this.monthFiltering = false;
    this.yearFiltering = false;
    this.cashiers = this.cashierClosureService.readAll();
  }

  readClosed() {
    this.cashiers = this.cashierClosureService.readClosed();
  }

  filterByCurrentMonth(): void {
    this.monthFiltering = true;
    this.yearFiltering = false;
    this.currentMonth = new Date().getMonth();
    this.searchCashierClosures();
  }

  filterByCurrentYear(): void {
    this.yearFiltering = true;
    this.monthFiltering = false;
    this.currentYear = new Date().getFullYear();
    this.searchCashierClosures();
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
