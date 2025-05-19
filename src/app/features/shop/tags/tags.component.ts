import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SearchByCompanyComponent } from '../shared/components/search-by-company.component';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CrudComponent } from '@common/components/crud.component';
import { FilterInputComponent } from '@common/components/filter-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Tag } from './models/tags.model';
import { AuthService } from '@core/services/auth.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ReadDetailDialogComponent } from '@common/dialogs/read-detail.dialog.component';
import { TagsCreationComponentComponent } from './components/tags-creating/TagsCreationComponent.component';
import { TagsUpdatingComponentComponent } from './components/tags-updating/TagsUpdatingComponent.component';
import { TagsService } from './services/tags.service';
import { ConfirmDialogComponent } from '../stock-audit/components/shared/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [
    MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
    MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
    NgForOf, MatIconModule, CrudComponent, FilterInputComponent, MatCardModule, MatTableModule,
    ConfirmDialogComponent
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit, OnDestroy {
  title = "Tag Management";
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  tags = this.tagsSubject.asObservable();
  private tagsSubscription: Subscription;

  ngOnInit(): void {
    this.loadTags();
    // Subscribe to tag updates
    this.tagsSubscription = this.tagService.tagsUpdated$.subscribe(() => {
      this.loadTags();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.tagsSubscription) {
      this.tagsSubscription.unsubscribe();
    }
  }
  
  constructor(
    private readonly tagService: TagsService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadTags()
  }
  loadTags(): void {
    this.tagService.searchAll().subscribe(tags => {
      this.tagsSubject.next(tags);
      // Trigger change detection to update the view
      this.cdr.markForCheck();
    });
  }


  read(tag: Tag): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Tag Details',
        object: this.tagService.read(tag.id)
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(TagsCreationComponentComponent);

    // Listen for dialog close event to handle any post-creation actions if needed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Tag created:', result);
        // The tagsUpdated$ subscription will handle reloading the tags
      }
    });
  }

  update(tag: Tag): void {
    this.tagService.read(tag.id)
      .subscribe({
        next: (fullTag) => {
          this.dialog.open(TagsUpdatingComponentComponent, { data: fullTag });
          // The tagsUpdated$ subscription will handle reloading the tags when the update is completed
        },
        error: (error) => {
          console.error('Error reading tag for update:', error);
        }
      });
  }

  delete(tag: Tag): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = `Are you sure you want to delete the tag "${tag.name}"?`;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.delete(tag.id).subscribe({
          next: () => {
            // The tagsUpdated$ subscription will handle reloading the tags
            console.log(`Tag "${tag.name}" deleted successfully`);
          },
          error: (error) => {
            console.error('Error deleting tag:', error);
          }
        });
      }
    });
  }
}
