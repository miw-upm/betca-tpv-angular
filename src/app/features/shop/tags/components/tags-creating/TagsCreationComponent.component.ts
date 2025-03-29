import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TagsService } from "../../services/tags.service";
import { Tag } from "../../models/tags.model";

@Component({
  standalone: true,
  selector: 'app-tags-creation',
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
  templateUrl: './TagsCreationComponent.component.html',
  styleUrls: ['./TagsCreationComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCreationComponentComponent {
  tagForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private dialogRef: MatDialogRef<TagsCreationComponentComponent>
  ) {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const tag: Tag = this.tagForm.value;
      this.tagsService.create(tag).subscribe({
        next: (createdTag) => {
          this.dialogRef.close(createdTag);
        },
        error: (error) => {
          console.error('Error creating tag:', error);
          // Here you could add error handling, like showing a snackbar
        }
      });
    }
  }
}
