import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Tag } from "../../models/tags.model";
import { TagsService } from "../../services/tags.service";

@Component({
  standalone: true,
  selector: 'app-tags-deleting',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Delete Tag</h2>
    <mat-dialog-content>
      Are you sure you want to delete the tag "{{ tag.name }}"?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" (click)="confirmDelete()">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      margin: 20px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsDeletingComponentComponent {
  constructor(
    private dialogRef: MatDialogRef<TagsDeletingComponentComponent>,
    private tagsService: TagsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public tag: Tag
  ) { }

  confirmDelete(): void {
    this.tagsService.delete(this.tag.id).subscribe({
      next: () => {
        this.snackBar.open('Tag deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error deleting tag:', error);
        this.snackBar.open('Error deleting tag', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.dialogRef.close(false);
      }
    });
  }
}
