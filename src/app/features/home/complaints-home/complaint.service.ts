import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from './complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintService {
    private static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(complaint: Complaint): Observable<Complaint> {
        return this.httpService
            .post(EndPoints.COMPLAINTS, complaint);
    }

    searchAll(): Observable<Complaint[]> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + ComplaintService.SEARCH);
    }

    read(id: string): Observable<Complaint> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + '/' + id);
    }

    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.COMPLAINTS + '/' + id);
    }

}
