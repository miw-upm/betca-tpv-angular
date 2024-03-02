import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Tag } from '@shared/models/tag.model';
import { TagService } from './tag.service';

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

  create(): void {
    // TODO: Implement create
  }

  read(tag: Tag): void {
    // TODO: Implement read
  }

  update(tag: Tag): void {
    // TODO: Implement update
  }

  delete(tag: Tag): void {
    // TODO: Implement delete
  }

  search(term: string): void {
    // TODO: Implement search
  }
}
