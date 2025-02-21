import { Component, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { BudgetService } from "../../services/budget.service";
import { MatIcon } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";

@Component({
  selector: "app-budget-create",
  imports: [
    MatDialogContent,
    FormsModule,
    MatInput,
    MatButton,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: "./budget-create.component.html",
  styleUrl: "./budget-create.component.css",
})
export class BudgetCreateComponent {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly dialog: MatDialog
  ) {}

  onCreate() {
    this.budgetService.create(null).subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
