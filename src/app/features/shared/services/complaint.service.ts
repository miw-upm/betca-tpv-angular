import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../models/complaint.model';

@Injectable({providedIn: 'root'})
export class ComplaintService {
    constructor(private readonly httpService: HttpService) {
    }

    read(id: string): Observable<Complaint> {
        return this.httpService
            .get(EndPoints.COMPLAINTS + '/' + id);
    }

    update(complaint: Complaint):Observable<Complaint>{
        return this.httpService
            .put(EndPoints.COMPLAINTS + '/' + complaint.id,complaint);
    }

    delete(id:String):Observable<void>{
        return this.httpService
            .delete(EndPoints.COMPLAINTS+'/'+id);
    }
}
