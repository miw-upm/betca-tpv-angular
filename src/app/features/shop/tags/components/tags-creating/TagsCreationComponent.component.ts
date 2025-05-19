import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TagsService } from "../../services/tags.service";
import { Tag } from "../../models/tags.model";
import { Article } from "../../../../shared/models/article.model";
import { ArticleService } from "app/features/shop/articles/article.service";
import { MatSelectModule } from "@angular/material/select";

@Component({
  standalone: true,
  selector: 'app-tags-creation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './TagsCreationComponent.component.html',
  styleUrls: ['./TagsCreationComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCreationComponentComponent {
  tagForm: FormGroup;
  availableArticle: Article[] = [];
  tag: Tag = {
    id: null,
    name: '',
    group: '',
    description: ''
  };
  productIds: string = '';

  constructor(
      private formBuilder: FormBuilder,
      private tagsService: TagsService,
      private articleService: ArticleService,
      private dialogRef: MatDialogRef<TagsCreationComponentComponent>,
      private snackBar: MatSnackBar
  ) {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
      productIds: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleService.search({} as any).subscribe({
      next: (articles) => {
        console.log('articles', articles);
        this.availableArticle = articles;
        console.log('availableArticle', this.availableArticle);
      },
      error: (err) => console.error('Error fetching articles', err)
    });
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const tag: Tag = this.tagForm.value;
      this.tagsService.create(tag).subscribe({
        next: (createdTag) => {
          // If an article is selected, associate it with the tag
          const productIds = this.tagForm.get('productIds').value;
          if (productIds) {
            this.articleService.read(productIds).subscribe({
              next: (article) => {
                // Update the article with the new tag
                article.tag = createdTag;
                this.articleService.update(article.barcode, article).subscribe({
                  next: () => {
                    this.snackBar.open("Tag created and associated with article successfully", "Close", {
                      duration: 3000,
                      panelClass: ['snackbar-success']
                    });
                    // The tagsService.create method already emits an event via tagsUpdated.next()
                    // which will trigger the table to update in real-time
                    // We still close the dialog to maintain the expected UX
                    this.dialogRef.close(createdTag);
                  },
                  error: (error) => {
                    console.error('Error updating article with tag:', error);
                    this.snackBar.open("Tag created but failed to associate with article", "Close", {
                      duration: 3000,
                      panelClass: ['snackbar-warning']
                    });
                    this.dialogRef.close(createdTag);
                  }
                });
              },
              error: (error) => {
                console.error('Error fetching article:', error);
                this.snackBar.open("Tag created but failed to fetch article for association", "Close", {
                  duration: 3000,
                  panelClass: ['snackbar-warning']
                });
                this.dialogRef.close(createdTag);
              }
            });
          } else {
            this.snackBar.open("Tag created successfully", "Close", {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            // The tagsService.create method already emits an event via tagsUpdated.next()
            // which will trigger the table to update in real-time
            // We still close the dialog to maintain the expected UX
            this.dialogRef.close(createdTag);
          }
        },
        error: (error) => {
          console.error('Error creating tag:', error);
          this.snackBar.open("Error creating tag", "Close", {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  create(): void {
    this.tagsService.create(this.tag).subscribe({
      next: (createdTag) => {
        // If an article is selected, associate it with the tag
        if (this.productIds) {
          this.articleService.read(this.productIds).subscribe({
            next: (article) => {
              // Update the article with the new tag
              article.tag = createdTag;
              this.articleService.update(article.barcode, article).subscribe({
                next: () => {
                  this.snackBar.open("Tag created and associated with article successfully", "Close", {
                    duration: 3000,
                    panelClass: ['snackbar-success']
                  });
                  // The tagsService.create method already emits an event via tagsUpdated.next()
                  // which will trigger the table to update in real-time
                  // We still close the dialog to maintain the expected UX
                  this.dialogRef.close(createdTag);
                },
                error: (error) => {
                  console.error('Error updating article with tag:', error);
                  this.snackBar.open("Tag created but failed to associate with article", "Close", {
                    duration: 3000,
                    panelClass: ['snackbar-warning']
                  });
                  this.dialogRef.close(createdTag);
                }
              });
            },
            error: (error) => {
              console.error('Error fetching article:', error);
              this.snackBar.open("Tag created but failed to fetch article for association", "Close", {
                duration: 3000,
                panelClass: ['snackbar-warning']
              });
              this.dialogRef.close(createdTag);
            }
          });
        } else {
          this.snackBar.open("Tag created successfully", "Close", {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          // The tagsService.create method already emits an event via tagsUpdated.next()
          // which will trigger the table to update in real-time
          // We still close the dialog to maintain the expected UX
          this.dialogRef.close(createdTag);
        }
      },
      error: (error) => {
        console.error('Error creating tag:', error);
        this.snackBar.open("Error creating tag", "Close", {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
