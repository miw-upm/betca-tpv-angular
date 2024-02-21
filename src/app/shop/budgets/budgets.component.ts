import { Component, OnInit } from '@angular/core';
import {of} from "rxjs";

import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {Budget} from "./budgets.model";
import {BudgetsSearch} from "./budgets-search.model";
import {MatDialog} from "@angular/material/dialog";
import {BudgetsService} from "./budgets.service";

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgetSearch: BudgetsSearch;
  title = 'Budgets management';
  budgets = of([]);

  constructor(private dialog: MatDialog, private budgetService: BudgetsService) {
    this.resetSearch();
  }

  loadBudgets(): void {
    this.budgets = this.budgetService.searchAll();
  }

  search(): void {
    this.budgets = this.budgetService.search(this.budgetSearch);
  }

  resetSearch(): void {
    this.budgetSearch = {};
    this.loadBudgets();
  }

  read(budget: Budget): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Budget Details',
        object: this.budgetService.read(budget.reference)
      }
    });
  }
  ngOnInit(): void {
    this.loadBudgets();
  }

}
