import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { TagsService } from "../../services/tags.service";
import { Tag } from "../../models/tags.model";

@Component({
  standalone: true,
  selector: 'app-tags-updating',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Update Tag</h2>
    <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="tagForm.get('name')?.errors">{{getErrorMessage('name')}}</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Group</mat-label>
          <input matInput formControlName="group" required>
          <mat-error *ngIf="tagForm.get('group')?.errors">{{getErrorMessage('group')}}</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" required></textarea>
          <mat-error *ngIf="tagForm.get('description')?.errors">{{getErrorMessage('description')}}</mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!tagForm.valid">Update</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 400px;
      margin: 20px 0;
    }
    mat-form-field {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsUpdatingComponentComponent {
  tagForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private dialogRef: MatDialogRef<TagsUpdatingComponentComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Tag
  ) {
    if (!data || !data.id || !data.name || !data.group || !data.description) {
      this.snackBar.open('Invalid tag data provided', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.dialogRef.close();
      return;
    }

    this.tagForm = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.minLength(2)]],
      group: [data.group, [Validators.required, Validators.minLength(2)]],
      description: [data.description, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.tagForm.valid && this.tagForm.dirty) {
      const updatedTag: Tag = {
        id: this.data.id,
        name: this.tagForm.value.name,
        group: this.tagForm.value.group,
        description: this.tagForm.value.description
      };
      
      this.tagsService.update(this.data.id, updatedTag).subscribe({
        next: (tag) => {
          this.snackBar.open('Tag updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(tag);
        },
        error: (error) => {
          console.error('Error updating tag:', error);
          this.snackBar.open('Error updating tag', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.tagForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    return '';
  }
}
