import {Component,} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {CreditLineService} from './credit-line.service';
import {CreditLine} from './credit-line.model';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {CreditSale} from "./credit-sale.model";
import {Ticket} from "../cashier-opened/tickets/tickets.models";


@Component({
  templateUrl: 'credit-line.component.html'
})

export class CreditLineComponent {

  mobile = "";
  creditLine: Observable<CreditLine>;
  card = false;
  cash = false;
  total = 0;
  unpaidTickets: Observable<CreditSale[]> = of([]);

  constructor(private dialog: MatDialog, private creditLineService: CreditLineService) {

  }


  clearMobile(){
    this.mobile ="";
  }
   create(mobile: string): void {
    if(this.checkUser(mobile)) {

    }
  }


  searchUnpaidTicketsByMobile(mobile: string): void {
    this.creditLine = this.creditLineService.findCreditByUserReference(mobile);

    this.unpaidTickets = this.creditLine.pipe(
      map(creditLine => creditLine.sales.filter(sale => !sale.payed))
    );

    this.unpaidTickets.subscribe(tickets => {
      this.total = tickets.reduce((acc, curr) => acc + this.calculateTicketTotal(curr.ticket), 0);
      console.log("tickets por pagar", tickets);
      console.log("el total es =", this.total);
    });
  }

  calculateTicketTotal(ticket: Ticket): number {
    console.log(ticket.shoppingList.reduce((acc, curr) => acc + curr.total, 0))
    return ticket.shoppingList.reduce((acc, item) => acc + (item.retailPrice * item.amount), 0);
  }

  checkUser(mobile:string){
   return true
  }
  pay(): void {
    if (this.card === true){

    }else if (this.cash === true){

    }
  }

  changePayMethod(method: string): void{
    if (method == "cash") {
      this.cash = true;
      this.card = false;
    } else {
      this.cash = false;
      this.card = true;
    }
  }


}
