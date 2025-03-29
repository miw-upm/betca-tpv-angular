import { CommonModule } from "@angular/common";
import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TagsService } from "../../../services/tags.service";
import { Tag } from "../../../models/tags.model";

@Component({
  standalone: true,
  selector: 'app-tag-updated',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './TagasUpdatedComponent.html',
  styleUrls: ['./TagUpdated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagUpdatedComponent {
  tagForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private dialogRef: MatDialogRef<TagUpdatedComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { tag: Tag }
  ) {
    this.tagForm = this.formBuilder.group({
      name: [data.tag.name, Validators.required],
      group: [data.tag.group, Validators.required],
      description: [data.tag.description, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tagForm.valid && this.data.tag.id) {
      const updatedTag: Tag = {
        id: this.data.tag.id,
        ...this.tagForm.value
      };

      this.tagsService.update(updatedTag.id, updatedTag).subscribe({
        next: (tag) => {
          this.dialogRef.close(tag);
        },
        error: (error) => {
          console.error('Error updating tag:', error);
          if (error.message === 'Tag not found') {
            // Manejar el caso de tag no encontrado (404)
            console.error('Tag not found with ID:', updatedTag.id);
          } else {
            // Otros errores
            console.error('Error updating tag:', error);
          }
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
