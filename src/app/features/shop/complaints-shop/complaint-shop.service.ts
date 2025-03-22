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

    read(id:string): Observable<Complaint> {
        return this.complaintService.read(id);
    }

    update(complaint:Complaint): Observable<Complaint> {
        return this.complaintService.update(complaint);
    }

    delete(id:String):Observable<void>{
        return this.complaintService.delete(id);
    }
}
