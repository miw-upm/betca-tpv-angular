import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

    update(oldId: string, tag: Tag): Observable<Tag> {
        return this.httpService
            .successful()
            .put(EndPoints.TAGS + '/' + oldId, tag);
    }

    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.TAGS + '/' + id);
    }

    search(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS);
    }
}
