import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../models/tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

    private mockTags: Tag[] = [];

    constructor() {
        this.createMockTags();
    }

    private createMockTags() {
        this.mockTags = [
            { id: '1', name: 'Tech', group: 'Category1', description: 'Technology-related tag' },
            { id: '2', name: 'Health', group: 'Category2', description: 'Health and wellness tag' },
            { id: '3', name: 'Finance', group: 'Category3', description: 'Financial and investment tag' },
            { id: '4', name: 'Education', group: 'Category4', description: 'Education and learning tag' },
            { id: '5', name: 'Entertainment', group: 'Category5', description: 'Movies, music, and games' }
        ];
    }

    create(tag: Tag): Observable<Tag> {
        const exists = this.mockTags.find(t => t.name === tag.name);
        if (!exists) {
            const newTag = { ...tag, id: (this.mockTags.length + 1).toString() };
            this.mockTags.push(newTag);
            return of(newTag);
        }
        return of(null);
    }

    searchAll(): Observable<Tag[]> {
        return of(this.mockTags);
    }
   
    read(id: string): Observable<Tag> {
        const tag = this.mockTags.find(t => t.id === id);
        return of(tag);
    }

    update(tag: Tag): Observable<Tag> {
        const index = this.mockTags.findIndex(t => t.id === tag.id);
        if (index > -1) {
            this.mockTags[index] = tag;
        }
        return of(tag);
    }

    delete(id: string): Observable<void> {
        this.mockTags = this.mockTags.filter(t => t.id !== id);
        return of();
    }
}
