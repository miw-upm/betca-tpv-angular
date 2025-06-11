import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Tag } from '../models/tags.model';
import { HttpService } from '@core/services/http.service';
import { EndPoints } from '@core/end-points';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
    static readonly SEARCH = '/search';
    static readonly SEARCH_BY_GROUP = '/search-by-group';

    private tagsUpdated = new Subject<void>();

    // Observable that components can subscribe to be notified of tag updates
    public tagsUpdated$ = this.tagsUpdated.asObservable();

    constructor(private readonly httpService: HttpService) {
    }

    create(tag: Tag): Observable<Tag> {
        return this.httpService
            .post(EndPoints.TAGS, tag)
            .pipe(
                tap(() => this.tagsUpdated.next()) // ✅ se ejecuta solo al suscribirse desde el componente
            );
    }

    searchAll(): Observable<Tag[]> {
        return this.httpService
            .get(EndPoints.TAGS);
    }

    read(id: string): Observable<Tag> {
        return this.httpService
            .get(EndPoints.TAGS + '/' + id);
    }

    update(id: string, tag: Tag): Observable<Tag> {
        return this.httpService
            .successful()
            .put(EndPoints.TAGS + '/' + id, tag)
            .pipe(
                tap(() => this.tagsUpdated.next()) // ✅ se ejecuta solo al suscribirse desde el componente
            );
    }

    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.TAGS + '/' + id)
            .pipe(
                tap(() => this.tagsUpdated.next()) // ✅ se ejecuta solo al suscribirse desde el componente
            );
    }

    findByName(name: string): Observable<Tag[]> {
        return this.httpService
            .param('name', name)
            .get(EndPoints.TAGS + TagsService.SEARCH);
    }

    findByGroup(group: string): Observable<Tag[]> {
        return this.httpService
            .param('group', group)
            .get(EndPoints.TAGS + TagsService.SEARCH_BY_GROUP);
    }
}
