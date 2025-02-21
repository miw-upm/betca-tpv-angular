import {Injectable} from "@angular/core";
import {Invoice} from "../models/invoice.model";
import {User} from "@core/models/user.model";
import {Observable, of} from "rxjs";
import {AuthService} from "@core/services/auth.service";

@Injectable({providedIn: 'root'})
export class InvoiceService {

    private mockInvoice: Invoice[] = [];

    constructor(private authService: AuthService) {
        this.createMockInvoice();
    }

    createMockInvoice(){
        this.mockInvoice = [
            { identity: 20251, creationDate: new Date(), baseTax: 20, taxValue: 25, user: this.authService.getUser(),
                ticket : undefined},
            { identity: 20252, creationDate: new Date(), baseTax: 40, taxValue: 50, user: this.authService.getUser(),
                ticket : undefined},
            { identity: 20253, creationDate: new Date(), baseTax: 60, taxValue: 100, user: this.authService.getUser(),
                ticket : undefined},
            { identity: 20254, creationDate: new Date(), baseTax: 80, taxValue: 150, user: this.authService.getUser(),
                ticket : undefined},
            { identity: 20255, creationDate: new Date(), baseTax: 100, taxValue: 200, user: this.authService.getUser(),
                ticket : undefined},
        ]
    }

    create(invoice: Invoice): Observable<Invoice> {
        const index : number = this.mockInvoice.findIndex(i => i.ticket.reference === invoice.ticket.reference);
        if (index < 0) {
            this.mockInvoice.push(invoice);
            return of(invoice);
        }
        return null;
    }

    read(identity: number): Observable<Invoice> {
        const invoice = this.mockInvoice.find(i => i.identity === identity);
        return of(invoice);
    }

    update(invoice: Invoice, user: User): Observable<Invoice> {
        const index = this.mockInvoice.findIndex(i => i.identity === invoice.identity);
        if (index > -1) {
            this.mockInvoice[index].user = user;
        }
        return of(invoice);
    }
    searchAll(): Observable<Invoice[]> {
        return of(this.mockInvoice);
    }
}