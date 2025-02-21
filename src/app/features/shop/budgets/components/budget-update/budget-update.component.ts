import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from "@angular/material/dialog";
import { Budget } from "../../models/budget";
import { BudgetService } from "../../services/budget.service";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: "app-budget-update",
  imports: [
    MatDialogContent,
    FormsModule,
    MatInput,
    MatButton,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: "./budget-update.component.html",
  styleUrl: "./budget-update.component.css",
})
export class BudgetUpdateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Budget,
    private readonly budgetService: BudgetService,
    private readonly dialog: MatDialog
  ) {}

  onUpdate() {
    this.budgetService.update(this.data.reference, this.data).subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
