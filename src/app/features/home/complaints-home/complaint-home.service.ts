import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintService} from "../../shared/services/complaint.service";
import {AuthService} from "@core/services/auth.service";
import {ComplaintCreation} from "../../shared/models/complaintCreation.model";

@Injectable({providedIn: 'root'})
export class ComplaintHomeService {

    private static readonly SEARCH = '/search';
    constructor(private readonly httpService: HttpService,private readonly complaintService: ComplaintService,private readonly authService:AuthService) {
    }

    searchByUserMobile(): Observable<Complaint[]> {
        return this.httpService
            .param('userMobile', this.authService.getMobile().toString())
            .get(EndPoints.COMPLAINTS + ComplaintHomeService.SEARCH)
    }

    create(complaintCreation: ComplaintCreation): Observable<Complaint> {
        return this.httpService
            .post(EndPoints.COMPLAINTS, complaintCreation);
    }

    read(id:string): Observable<Complaint> {
        return this.complaintService.read(id);
    }

    update(complaint:Complaint): Observable<Complaint> {
        return this.complaintService.update(complaint);
    }
    delete(id: string): Observable<void> {
        return this.complaintService.delete(id);
    }

}
