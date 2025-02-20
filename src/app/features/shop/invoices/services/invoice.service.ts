import {Injectable} from "@angular/core";
import {Invoice} from "../models/invoice.model";
import {User} from "@core/models/user.model";
import {TicketCreation} from "../../cashier-opened/shopping-cart/ticket-creation.model";
import {Observable, of} from "rxjs";
import {AuthService} from "@core/services/auth.service";
import {InvoiceSearch} from "../invoice-search";

@Injectable({providedIn: 'root'})
export class InvoiceService {

    private mockInvoice: Invoice[] = [];

    constructor(private authService: AuthService) {
        this.createMockInvoice();
    }

    createMockInvoice(){
       this.mockInvoice = [
           { identity: 20251, creationDate: new Date(), baseTax: 20, taxValue: 25, user: this.authService.getUser(),
           ticketCreation : {cash: 0, card: 1, voucher: 0, shoppingList: [], note: ''}},
           { identity: 20252, creationDate: new Date(), baseTax: 40, taxValue: 50, user: this.authService.getUser(),
               ticketCreation : {cash: 5, card: 2, voucher: 0, shoppingList: [], note: ''}},
           { identity: 20253, creationDate: new Date(), baseTax: 60, taxValue: 100, user: this.authService.getUser(),
               ticketCreation : {cash: 26, card: 3, voucher: 0, shoppingList: [], note: ''}},
           { identity: 20254, creationDate: new Date(), baseTax: 80, taxValue: 150, user: this.authService.getUser(),
               ticketCreation : {cash: 100, card: 4, voucher: 0, shoppingList: [], note: ''}},
           { identity: 20255, creationDate: new Date(), baseTax: 100, taxValue: 200, user: this.authService.getUser(),
               ticketCreation : {cash: 80, card: 5, voucher: 0, shoppingList: [], note: ''}},
       ]
    }

    create(tax: number, ticketCreation: TicketCreation): Observable<Invoice> {
        const index = this.mockInvoice.findIndex(i => i.ticketCreation === ticketCreation);
        if (index < 0) {
            const currentYear: number = new Date().getFullYear();
            const sumRetailPrice: number = this.mockInvoice
                .flatMap(invoice => invoice.ticketCreation)
                .flatMap(ticket => ticket.shoppingList)
                .reduce((totalPrice, shopping) => totalPrice + shopping.retailPrice, 0)
            const baseTax : number= sumRetailPrice/(1 + tax/ 100);
            const taxValue : number = sumRetailPrice - baseTax;

            let invoice : Invoice =  {
                identity: currentYear,
                creationDate: new Date(),
                baseTax: baseTax,
                taxValue: taxValue,
                user: this.authService.getUser(),
                ticketCreation
            }

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

    search(search : InvoiceSearch): Observable<Invoice[]> {
        if (search.mobile) {
            return of(this.mockInvoice.filter(i => i.user.mobile === search.mobile));
        }
        else if (search.ticketCreation) {
            return of(this.mockInvoice.filter(i => i.ticketCreation === search.ticketCreation));
        }
        return null;
    }

    searchByTicket(ticket: TicketCreation): Observable<Invoice[]> {
        return of(this.mockInvoice.filter(i => i.ticketCreation === ticket));
    }

    searchAll(): Observable<Invoice[]> {
        return of(this.mockInvoice);
    }
}