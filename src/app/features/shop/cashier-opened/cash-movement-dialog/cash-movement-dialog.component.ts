import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MovementTypes} from "./MovementTypes";
import {NgIf} from "@angular/common";
import {CashMovementService} from "./cash-movement.service";

@Component({
  selector: 'app-cash-movement-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatIcon,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatError,
    NgIf
  ],
  templateUrl: './cash-movement-dialog.component.html',
  standalone: true,
  styleUrl: './cash-movement-dialog.component.css'
})
export class CashMovementDialogComponent {


  readonly type = new FormControl('', [Validators.required]);
  readonly amount = new FormControl('', [Validators.required, Validators.min(0.01)]);
  readonly comment = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(private readonly dialog: MatDialog, private readonly dialogRef: MatDialogRef<CashMovementDialogComponent>,
              private readonly cashMovementService: CashMovementService) {
  }

  close(): void {
    this.cashMovementService.addMovement({
      type: MovementTypes[this.type.getRawValue()],
      amount: Number.parseFloat(this.amount.getRawValue()),
      comment: this.comment.getRawValue()
    }).subscribe(
        () => {
          this.dialogRef.close();
        }
    );
  }

  protected trimComment() {
    this.comment.setValue(this.comment.getRawValue().trimStart())
  }

  protected readonly MovementTypes = MovementTypes;
}
