import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../models/complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintService {
    constructor(private readonly httpService: HttpService) {
    }

    read(trackingCode: string): Observable<Complaint> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + '/' + trackingCode);
    }

    update(complaint: Complaint):Observable<Complaint>{
        return this.httpService
            .put(EndPoints.COMPLAINTS + '/' + complaint.trackingCode,complaint);
    }

    delete(trackingCode:String):Observable<void>{
        return this.httpService
            .delete(EndPoints.COMPLAINTS+'/'+trackingCode);
    }
}
