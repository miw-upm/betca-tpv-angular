import { Component, Inject, OnInit } from "@angular/core";
import { Budget } from "../../models/budget";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { CrudComponent } from "@common/components/crud.component";
import { Observable, of } from "rxjs";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-budgets-selector-dialog",
  imports: [
    CrudComponent,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: "./budgets-selector-dialog.component.html",
  styleUrl: "./budgets-selector-dialog.component.css",
})
export class BudgetsSelectorDialogComponent implements OnInit {
  budgets$: Observable<Budget[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Budget[],
    private dialogRef: MatDialogRef<BudgetsSelectorDialogComponent>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.budgets$ = of(this.data);
  }

  onRead(budget: Budget) {
    this.dialogRef.close(budget);
  }
}
