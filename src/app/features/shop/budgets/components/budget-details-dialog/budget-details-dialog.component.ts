import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { BudgetRowData } from "../../models/budget";
import { BudgetService } from "../../services/budget.service";
import { MatButton } from "@angular/material/button";
import { CurrencyPipe, DatePipe } from "@angular/common";

@Component({
  selector: "app-budget-details-dialog",
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: "./budget-details-dialog.component.html",
  styleUrl: "./budget-details-dialog.component.css",
})
export class BudgetDetailsDialogComponent {
  budget: BudgetRowData;

  constructor(@Inject(MAT_DIALOG_DATA) private data: BudgetRowData) {
    this.budget = data;
  }
}
