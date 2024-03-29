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
    { id: '1', barcode: '123456789', description: 'Mocked Complaint 1', registrationDate: new Date(), state: 'open'},
    { id: '2', barcode: '987654321', description: 'Mocked Complaint 2', registrationDate: new Date(), state: 'open'},
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
      state: 'open'
    };
    return of(mockResponse);
  }

  /*
   searchAll(): Observable<Complaint[]> {
        return this.httpService
       .get(EndPoints.COMPLAINTS + ComplaintService.SEARCH);
   }
   */
  searchAll(): Observable<Complaint[]> {
    return of(this.mockComplaints);
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

  /*
  delete(id: string): Observable<void> {
    return this.httpService
      .delete(EndPoints.COMPLAINTS + '/' + id);
  }
  */
  delete(id: string): Observable<void> {
    this.mockComplaints = this.mockComplaints.filter(c => c.id !== id);
    return of(undefined);
  }
  update(complaint: Complaint): Observable<Complaint> {
    const index = this.mockComplaints.findIndex(c => c.id === complaint.id);
    if (index !== -1) {
      this.mockComplaints[index] = complaint;
    }
    return of(complaint);
  }

  closeComplaint(complaintId: string, response: string): Observable<Complaint> {
    const changes = {
      state: 'closed',
      response: response
    };
    return this.httpService.patch(`${EndPoints.COMPLAINTS}/${complaintId}`, changes);
  }
}
