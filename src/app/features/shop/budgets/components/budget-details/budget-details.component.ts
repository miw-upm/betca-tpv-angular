import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from "@angular/material/dialog";
import { Budget } from "../../models/budget";
import { BudgetService } from "../../services/budget.service";
import { DatePipe, JsonPipe } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { UppercaseWordsPipe } from "@common/pipes/uppercase-words.pipe";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-budget-details",
  imports: [
    JsonPipe,
    MatToolbar,
    DatePipe,
    MatDialogContent,
    MatLabel,
    UppercaseWordsPipe,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatButton,
  ],
  templateUrl: "./budget-details.component.html",
  styleUrl: "./budget-details.component.css",
})
export class BudgetDetailsComponent {
  budget: Budget;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Budget,
    private readonly budgetService: BudgetService,
    private readonly dialog: MatDialog
  ) {
    this.budget = data;
  }

  onRead() {
    this.budgetService.read(this.data.reference).subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
