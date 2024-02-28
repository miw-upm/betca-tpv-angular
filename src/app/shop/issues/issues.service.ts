import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '@core/http.service';

import { EndPoints } from '@shared/end-points';
import {Issue} from './issues-model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {}

  create(provider: any): Observable<any> {
    return this.httpService.post(EndPoints.ISSUE, provider);
  }
  search(): Observable<any[]> {
    const issues = [
      {
        id: 1,
        title: 'Found a bug',
        state: 'open',
        assigned: 'octocat',
        milestone: 'v1.0',
        created_at: '05/10/2022',
      },
      {
        id: 2,
        title: 'Enhance application security',
        state: 'closed',
        assigned: 'btobar',
        milestone:'v1.1',
        created_at: '15/11/2022',
      },
      {
        id: 3,
        title: 'Improve UI/UX',
        state: 'open',
        assigned: 'jriveros',
        milestone: 'v2.0',
        created_at: '01/20/2023',
      },
    ];

    return of(issues);
    //return this.httpService.get(EndPoints.ISSUE + IssueService.SEARCH);
  }
}
