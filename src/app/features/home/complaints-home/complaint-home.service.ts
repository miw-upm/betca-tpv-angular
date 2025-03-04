import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintService} from "../../shared/services/complaint.service";

@Injectable({providedIn: 'root'})
export class ComplaintHomeService {

    private static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService,private readonly complaintService: ComplaintService) {
    }

    searchByUserMobile(): Observable<Complaint[]> {
        return this.httpService
            .param('userMobile', "66")
            .get(EndPoints.COMPLAINTS + ComplaintHomeService.SEARCH)
    }

    create(complaint: Complaint): Observable<Complaint> {
        return this.httpService
            .post(EndPoints.COMPLAINTS, complaint);
    }

    read(id:string): Observable<Complaint> {
        return this.complaintService.read(id);
    }

    update(complaint:Complaint): Observable<Complaint> {
        return this.complaintService.update(complaint);
    }
    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.COMPLAINTS + '/' + id);
    }

}
