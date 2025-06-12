import {Injectable} from "@angular/core";
import {Invoice} from "../models/invoice.model";
import {Observable} from "rxjs";
import {HttpService} from "@core/services/http.service";
import {EndPoints} from "@core/end-points";
import { AuthService } from "@core/services/auth.service";

@Injectable({providedIn: 'root'})
export class InvoiceService {
    private static TICKET_SEARCH: string = '/ticket-search';
    private static MOBILE_SEARCH : string = "/mobile-search";
    private static RECEIPT = '/receipt';

    constructor(private httpService: HttpService, private readonly authService: AuthService) {
    }

    create(invoice: Invoice): Observable<Invoice> {
        const invoiceData = {
            ticket: invoice.ticket.id,
            mobile: invoice.user.mobile ?? this.authService.getUser().mobile
        }
        return this.httpService
            .post(EndPoints.INVOICES, invoiceData);
    }

    searchByTicketId(ticketId: string): Observable<Invoice> {
        return this.httpService
            .param('ticketId', ticketId)
            .get(EndPoints.INVOICES + InvoiceService.TICKET_SEARCH);
    }

    searchByUserMobile(mobile: string): Observable<Invoice[]> {
        return this.httpService
            .param('mobile', mobile)
            .get(EndPoints.INVOICES + InvoiceService.MOBILE_SEARCH);
    }

    read(identity: number): Observable<Invoice> {
        return this.httpService
            .get(EndPoints.INVOICES + "/" + identity);
    }

    updateUser(identity: number, user : {}): Observable<Invoice> {
        return this.httpService.patch(EndPoints.INVOICES + "/" + identity, user);
    }

    searchAll(): Observable<Invoice[]> {
        return this.httpService
            .get(EndPoints.INVOICES);
    }

    readReceipt(identity : number) :Observable<void> {
        return this.httpService.pdf().get(EndPoints.INVOICES + '/' + identity + InvoiceService.RECEIPT);
    }
}