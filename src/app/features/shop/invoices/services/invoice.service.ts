import {Injectable} from "@angular/core";
import {Invoice} from "../models/invoice.model";
import {Observable} from "rxjs";
import {HttpService} from "@core/services/http.service";
import {EndPoints} from "@core/end-points";

@Injectable({providedIn: 'root'})
export class InvoiceService {
    private static TICKET_SEARCH: string = '/ticket-search';
    private static MOBILE_SEARCH : string = "/mobile-search";
    private static RECEIPT = '/receipt';

    constructor(private httpService: HttpService) {
    }

    create(invoice: Invoice): Observable<Invoice> {
        const invoiceData = {ticket:
                {
                    id: invoice.ticket.id,
                    reference: invoice.ticket.reference,
                    shoppingList: invoice.ticket.shoppingList,
                    cash: invoice.ticket.cash,
                    card: invoice.ticket.card,
                    voucher: invoice.ticket.voucher,
                    note: invoice.ticket.note,
                    class: invoice.ticket.class,
                    user: {
                        mobile: invoice.user.mobile,
                    }
                },
            user:{
                mobile: invoice.user.mobile
            }
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

    updateUser(identity: number, mobile : string): Observable<Invoice> {
        return this.httpService.patch(EndPoints.INVOICES + "/" + identity, {mobile});
    }

    searchAll(): Observable<Invoice[]> {
        return this.httpService
            .get(EndPoints.INVOICES);
    }

    readReceipt(identity : number) :Observable<void> {
        return this.httpService.pdf().get(EndPoints.INVOICES + '/' + identity + InvoiceService.RECEIPT);
    }
}