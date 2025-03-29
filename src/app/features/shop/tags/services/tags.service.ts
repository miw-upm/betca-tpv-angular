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
        if (!tag) {
            return throwError(() => new Error('Tag object is required for update'));
        }
        return this.httpService
            .put(`${EndPoints.TAGS}/${id}`, tag)
            .pipe(
                map((response: any) => {
                    if (!response) {
                        throw new Error('Tag not found');
                    }
                    return response as Tag;
                })
            ) as Observable<Tag>;
    }

    delete(id: string): Observable<void> {
        if (!id) {
            return throwError(() => new Error('ID is required for delete'));
        }
        return this.httpService
            .delete(`${EndPoints.TAGS}/${id}`) as Observable<void>;
    }

    search(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS) as Observable<Tag[]>;
    }
}