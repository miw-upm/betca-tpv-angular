import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../shared/services/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {

  private mockTags: Tag[] = [
    { name: 'Tag1', group: 'Group1', description: 'Description1', articles: [] },
    { name: 'Tag2', group: 'Group2', description: 'Description2', articles: [] },
    { name: 'Tag3', group: 'Group3', description: 'Description3', articles: [] }
  ];

  constructor() {}

  create(tag: Tag): Observable<Tag> {
    this.mockTags.push(tag);
    return of(tag);
  }

  read(name: string): Observable<Tag> {
    const tag = this.mockTags.find(t => t.name === name);
    return of(tag);
  }

  update(originalName: string, updatedTag: Tag): Observable<Tag> {
    const index = this.mockTags.findIndex(t => t.name === originalName);
    if (index > -1) {
      this.mockTags[index] = updatedTag;
    } else {
      console.error('Tag not found for update:', originalName);
    }
    return of(this.mockTags[index]);
  }


  delete(name: string): Observable<void> {
    this.mockTags = this.mockTags.filter(t => t.name !== name);
    return of(undefined);
  }

  search(term: string = ''): Observable<Tag[]> {
    if (!term.trim()) {
      return of(this.mockTags);
    }
    return of(this.mockTags.filter(tag => tag.name.toLowerCase().includes(term.toLowerCase())));
  }
}
