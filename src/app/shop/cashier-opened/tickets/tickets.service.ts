import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from './tickets.models';
import { Shopping } from "@shared/models/shopping.model";
import {CashierClosureService} from "../cashier-closure/cashier-closure.service";
import {SharedVoucherService} from "../../shared/services/shared-voucher.service";
import {CashierState} from "../cashier-closure/cashier-state.model";
import {EndPoints} from "@shared/end-points";
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private mockTickets: Ticket[];
  cashierState: Observable<CashierState>;

  static FINALVALUE = '/finalvalue';
  static SEARCHBYTICKET = '/search';
  static SEARCHBYGIFTTICKET = '/search-by-gift-ticket';
  constructor( private cashierClosureService: CashierClosureService,
               private sharedVoucherService: SharedVoucherService, private httpService: HttpService) {
    //this.cashierState = this.cashierClosureService.readState();
    let sl = new Shopping("test", "test", 100);
    let sl2 = new Shopping("test2", "test2", 50);
    this.mockTickets = [
      {
        id: '1',
        reference: 'REF123',
        shoppingList: [sl,sl2],
        creationDate: new Date(),
        cash: '100',
        card: '50',
        voucher: '0',
        note: 'First ticket',
        userMobile: '1234567890',
        class: 'Standard'
      },
      {
        id: '2',
        reference: 'REF456',
        shoppingList: [sl2],
        creationDate: new Date(),
        cash: '40',
        card: '10',
        voucher: '0',
        note: 'Second ticket',
        userMobile: '0987654321',
        class: 'Premium'
      }
    ];
  }

  search(query: string): Observable<Ticket[]> {
    return this.httpService.paramsFrom({query:query}).get(EndPoints.TICKETS + TicketService.SEARCHBYTICKET);
  }

  searchByGiftTicket(searchByGiftTicketReference: string): Observable<Ticket[]> {
    if (!searchByGiftTicketReference || /^\s*$/.test(searchByGiftTicketReference)) {
      return of([]);
    }
    return this.httpService.paramsFrom({reference: searchByGiftTicketReference}).get(EndPoints.TICKETS + TicketService.SEARCHBYGIFTTICKET);
  }

  read(reference: string): Observable<Ticket> {
    return this.httpService
      .get(EndPoints.TICKETS +  '/' + reference);
  }

  update(oldId: string, ticket: Ticket): Observable<Ticket> {
    return this.httpService
      .successful()
      .put(EndPoints.TICKETS + '/' + oldId, ticket);
  }

  printVoucher(amount: number): void {
    this.sharedVoucherService.printVoucher(amount).subscribe(response => {
      console.log('Voucher printed', response);
    });
  }

  getTotal(reference: string): Observable<Number> {
    return this.httpService
      .get(EndPoints.TICKETS + TicketService.FINALVALUE + '/' + reference);
  }

}
