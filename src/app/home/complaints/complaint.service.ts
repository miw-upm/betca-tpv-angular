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

  private mockComplaints: Complaint[] = [
    { id: '1', barcode: '123456789', description: 'Mocked Complaint 1', registrationDate: new Date() },
    { id: '2', barcode: '987654321', description: 'Mocked Complaint 2', registrationDate: new Date() },
  ];

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

  /*
  read(id: string): Observable<Complaint> {
    return this.httpService
      .get(EndPoints.COMPLAINTS + '/' + id);
  }
  */

  read(id: string): Observable<Complaint> {
    const complaint = this.mockComplaints.find(c => c.id === id);
    return of(complaint || {} as Complaint);
  }

  delete(id: string): Observable<void> {
    return this.httpService
      .delete(EndPoints.COMPLAINTS + '/' + id);
  }
}
