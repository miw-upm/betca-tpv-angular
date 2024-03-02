import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@shared/models/tag.model';
import { EndPoints } from '@shared/end-points';
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private httpService: HttpService) {}

  read(name: string, group: string): Observable<Tag> {
    return this.httpService
      .get(EndPoints.TAGS + '/' + name + '/' + group);
  }

  findAll(): Observable<Tag[]> {
    return this.httpService
      .get(EndPoints.TAGS);
  }

}
