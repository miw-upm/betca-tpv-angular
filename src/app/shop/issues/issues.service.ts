import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/http.service';
import { EndPoints } from '@shared/end-points';
import { Issue, NewIssue } from './issues-model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private httpService: HttpService) {}

  create(newIssue: NewIssue): Observable<any> {
    return this.httpService.post(EndPoints.ISSUE, newIssue);
  }

  search(): Observable<Issue[]> {
    return this.httpService.get(EndPoints.ISSUE);
  }
}
