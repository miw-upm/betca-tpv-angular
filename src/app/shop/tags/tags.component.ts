import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Tag } from '@shared/models/tag.model';
import { TagService } from './tag.service';
import {TagCreationReadingUpdatingDialogComponent} from "./tag-creation-reading-updating-dialog.component";

@Component({
  templateUrl: 'tags.component.html',
})
export class TagsComponent {
  title = 'Tags Management';
  tags: Observable<Tag[]>;

  constructor(private dialog: MatDialog, private tagService: TagService) {
    this.loadTags();
  }

  loadTags(): void {
    this.tags = this.tagService.findAll();
  }

  read(tag: Tag): void {
    this.dialog.open(TagCreationReadingUpdatingDialogComponent, {
      data: { ...tag, readOnly: true }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(TagCreationReadingUpdatingDialogComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTags();
    });
  }

  update(tag: Tag): void {
    this.dialog.open(TagCreationReadingUpdatingDialogComponent, {
      data: tag
    }).afterClosed().subscribe(() => {
      this.loadTags();
    });
  }

  delete(tag: Tag): void {
    // TODO: Implement delete
  }

  search(term: string): void {
    // TODO: Implement search
  }
}
