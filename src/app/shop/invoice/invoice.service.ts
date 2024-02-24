import {Injectable} from '@angular/core';
import {Invoice} from "../cashier-opened/shopping-cart/invoice.model";
import {User} from "@core/user.model";
import {Observable, of} from "rxjs";
import {AuthService} from "@core/auth.service";
import {InvoiceSearch} from "./invoice-search.model";


@Injectable({
  providedIn: 'root',
})

export class InvoiceService {

  constructor(private auth: AuthService) {
  }

  private mockInvoice: Invoice[] = [
    { identity: 20243, creationDate: new Date(), baseTax: 20, taxValue: 25, user: this.auth.getUser(),
      ticket : undefined},
    { identity: 20242, creationDate: new Date(), baseTax: 12, taxValue: 22, user: this.auth.getUser(),
      ticket : undefined },
    { identity: 20241, creationDate: new Date(), baseTax: 10, taxValue: 5, user: this.auth.getUser(),
      ticket : undefined }
  ];

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
      //TODO: check the new user exist
      this.mockInvoice[index].user = user;
    }
    return of(invoice);
  }

  searchByMobile(search : InvoiceSearch): Observable<Invoice[]> {
    return of(this.mockInvoice.filter(i => i.user.mobile === search.mobile));
  }

  searchByTicket(search : InvoiceSearch): Observable<Invoice[]> {
    return of(this.mockInvoice.filter(i => i.ticket.reference === search.ticketReference));
  }

  searchAll(): Observable<Invoice[]> {
    return of(this.mockInvoice);
  }

}
