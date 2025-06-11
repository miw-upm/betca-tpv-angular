import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ArticleService } from "app/features/shop/articles/article.service";
import { Article } from "../../../../../shared/models/article.model";
import { Tag } from "../../../models/tags.model";
import { TagsService } from "../../../services/tags.service";

@Component({
  standalone: true,
  selector: 'app-tags-updating-component',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TagsService],
  templateUrl: './TagsUpdatedComponent.component.html',
styleUrls: ['./TagUpdatedComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsUpdatingComponentComponent implements OnInit {
  tag: Tag;
  availableArticle: Article[] = [];
  productIds: string = '';

  constructor(
    private tagsService: TagsService,
    private articleService: ArticleService,
    private dialogRef: MatDialogRef<TagsUpdatingComponentComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Tag
  ) {
    this.tag = { ...data }; // Create a copy of the tag data
  }

  ngOnInit(): void {
    this.articleService.search({} as any).subscribe({
      next: (articles) => {
        this.availableArticle = articles;
      },
      error: (err) => console.error('Error fetching articles', err)
    });
  }

  update(): void {
    this.tagsService.update(this.tag.id, this.tag).subscribe({
      next: (updatedTag) => {
        this.snackBar.open("Tag updated successfully", "Close", {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        // The tagsService.update method already emits an event via tagsUpdated.next()
        // which will trigger the table to update in real-time
        this.dialogRef.close(updatedTag);
      },
      error: (error) => {
        console.error('Error updating tag:', error);
        this.snackBar.open("Error updating tag", "Close", {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
