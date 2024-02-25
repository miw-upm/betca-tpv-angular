import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Complaint} from './complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  /*create(complaint: Complaint): Observable<Complaint> {
    return this.httpService
      .post(EndPoints.COMPLAINTS, complaint);
  }*/

  create(complaint: Complaint): Observable<Complaint> {
    const mockResponse: Complaint = {
      id: 'mockId',
      barcode: complaint.barcode,
      description: complaint.description,
      registrationDate: new Date(),
    };
    return of(mockResponse);
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
