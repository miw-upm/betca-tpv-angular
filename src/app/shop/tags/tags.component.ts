import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Tag } from '../shared/services/models/tag.model';
import { TagService } from './tag.service';
import { TagCreationReadingUpdatingDialogComponent} from "./tag-creation-reading-updating-dialog.component";

@Component({
  templateUrl: 'tags.component.html',
})
export class TagsComponent {
  title = 'Tags Management';
  tags = of([]);

  constructor(private dialog: MatDialog, private tagService: TagService) {
    this.loadTags();
  }

  loadTags(): void {
    this.tags = this.tagService.search();
  }

  create(): void {
    const dialogRef = this.dialog.open(TagCreationReadingUpdatingDialogComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTags();
    });
  }

  read(tag: Tag): void {
    this.dialog.open(TagCreationReadingUpdatingDialogComponent, {
      data: { ...tag, readOnly: true }
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
    this.tagService.delete(tag.name).subscribe(() => {
      this.loadTags();
    });
  }

  search(term: string): void {
    this.tags = this.tagService.search(term);
  }
}
