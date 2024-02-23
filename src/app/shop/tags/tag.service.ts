import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '@shared/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {

  private mockTags: Tag[] = [
    {
      name: 'Sale',
      group: 'Promotions',
      description: 'Discounted Items',
      articles: [
        { barcode: '123', description: 'Article 1 - Sale', retailPrice: 10 },
        { barcode: '456', description: 'Article 2 - Sale', retailPrice: 20 },
      ],
    },
    {
      name: 'Popular',
      group: 'Trends',
      description: 'Top Selling Items',
      articles: [
        { barcode: '789', description: 'Article 1 - Popular', retailPrice: 30 },
        { barcode: '012', description: 'Article 2 - Popular', retailPrice: 40 },
      ],
    },
    {
      name: 'New',
      group: 'Arrivals',
      description: 'Latest Items',
      articles: [
        { barcode: '345', description: 'Article 1 - New', retailPrice: 50 },
        { barcode: '678', description: 'Article 2 - New', retailPrice: 60 },
      ],
    },
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
