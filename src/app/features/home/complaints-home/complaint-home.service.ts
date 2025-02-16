import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintService} from "../../shared/services/complaint.service";

@Injectable({providedIn: 'root'})
export class ComplaintHomeService {

    constructor(private readonly httpService: HttpService,private readonly complaintService: ComplaintService) {
    }

    create(complaint: Complaint): Observable<Complaint> {
        return this.httpService
            .post(EndPoints.COMPLAINTS, complaint);
    }

    delete(id: string): Observable<void> {
        return this.httpService
            .delete(EndPoints.COMPLAINTS + '/' + id);
    }

    searchAll(): Observable<Complaint[]> {
        return this.complaintService.searchAll();
    }

    read(id:string): Observable<Complaint> {
        return this.complaintService.read(id);
    }

}
