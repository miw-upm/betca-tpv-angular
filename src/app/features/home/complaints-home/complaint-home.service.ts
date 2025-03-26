import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {Complaint} from '../../shared/models/complaint.model';
import {ComplaintService} from "../../shared/services/complaint.service";
import {AuthService} from "@core/services/auth.service";
import {ComplaintCreation} from "../../shared/models/complaintCreation.model";
import {ComplaintUpdateCustomerModel} from "./complaintUpdateCustomer.model";

@Injectable({providedIn: 'root'})
export class ComplaintHomeService {

    private static readonly SEARCH = '/search';

    private static readonly COMPLAINT_UPDATE_CUSTOMER = "/customer";
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

    read(trackingCode:string): Observable<Complaint> {
        return this.complaintService.read(trackingCode);
    }
    update(trackingCode:string,complaint:ComplaintUpdateCustomerModel): Observable<Complaint> {
        return this.httpService
            .put(EndPoints.COMPLAINTS+trackingCode+ComplaintHomeService.COMPLAINT_UPDATE_CUSTOMER,complaint);
    }
    delete(trackingCode: string): Observable<void> {
        return this.complaintService.delete(trackingCode);
    }

}
