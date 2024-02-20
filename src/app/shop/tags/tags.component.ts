import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Tag } from '../shared/services/models/tag.model';
import { TagService } from './tag.service';

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
    // TODO: open dialog to create tag
  }

  read(tag: Tag): void {
    // TODO: open dialog to read tag
  }

  update(tag: Tag): void {
    // TODO: open dialog to update tag
  }

  delete(tag: Tag): void {
    this.tagService.delete(tag.name).subscribe(() => {
      this.loadTags();
    });
  }
}
