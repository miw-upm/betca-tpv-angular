import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintService} from "../../shared/services/complaint.service";

@Injectable({providedIn: 'root'})
export class ComplaintShopService {

    private static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService,private readonly complaintService: ComplaintService) {
    }

    searchAll(): Observable<Complaint[]> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + ComplaintShopService.SEARCH);
    }

    read(trackingCode:string): Observable<Complaint> {
        return this.complaintService.read(trackingCode);
    }

    update(complaint:Complaint): Observable<Complaint> {
        return this.complaintService.update(complaint);
    }

    delete(trackingCode:String):Observable<void>{
        return this.complaintService.delete(trackingCode);
    }
}
