import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../models/complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintService {
    private static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    searchAll(): Observable<Complaint[]> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + ComplaintService.SEARCH);
    }

    read(id: string): Observable<Complaint> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + '/' + id);
    }

}
