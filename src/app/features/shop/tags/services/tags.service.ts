import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '@core/services/http.service';
import { EndPoints } from '@core/end-points';
import { Tag } from '../models/tags.model';

@Injectable({
    providedIn: 'root'
})
export class TagsService {
    static readonly SEARCH = '/search';
    static readonly POPULAR = '/popular';
    static readonly SALE = '/sale';
    static readonly NEW = '/new';

    constructor(private readonly httpService: HttpService) {
    }

    create(tag: Tag): Observable<Tag> {
        return this.httpService
            .post(EndPoints.TAGS, tag);
    }

    read(id: string): Observable<Tag> {
        return this.httpService
            .get(EndPoints.TAGS + '/' + id);
    }

    update(id: string, tag: Tag): Observable<Tag> {
        if (!id) {
            return throwError(() => new Error('ID is required for update'));
        }
        return this.httpService
            .put(EndPoints.TAGS + '/' + id, tag);
    }

    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.TAGS + '/' + id);
    }

    search(query?: Partial<Tag>): Observable<Tag[]> {
        const queryParams = query ? '?' + Object.entries(query)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join('&') : '';
        return this.httpService
            .get(EndPoints.TAGS + TagsService.SEARCH + queryParams);
    }

    getPopularTags(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS + TagsService.POPULAR);
    }

    getSaleTags(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS + TagsService.SALE);
    }

    getNewTags(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS + TagsService.NEW);
    }
}