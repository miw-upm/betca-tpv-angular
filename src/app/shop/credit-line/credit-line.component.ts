import {Component,} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {CreditLineService} from './credit-line.service';
import {CreditLine} from './credit-line.model';
import {of} from "rxjs";


@Component({
  templateUrl: 'credit-line.component.html'
})

export class CreditLineComponent {

  creditLine: CreditLine;
  card = false;
  cash = false;
  total = 0;
  unpaidTickets = of([]);

  constructor(private dialog: MatDialog, private creditLineService: CreditLineService) {

  }


   create(mobile: string): void {
    if(this.checkUser(mobile)) {
      this.creditLineService
        .create(this.creditLine)
        .subscribe(() => this.dialog.closeAll());
    }
  }


  searchUnpaidTicketsByMobile(mobile: string): void {
    this.unpaidTickets = this.creditLineService.findUnpaidTicketsFromCreditLineByMobile(mobile)
  }


  checkUser(mobile:string){
    if(this.creditLineService.findByUserReference(mobile)){
      return false;
    }
  return false
  }
  pay(): void {
    if (this.card === true){
      this.creditLineService.payUnpaidTicketsFromCreditLine(this.creditLine.mobile, 'card');
    }else if (this.cash === true){
      this.creditLineService.payUnpaidTicketsFromCreditLine(this.creditLine.mobile, 'cash');
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
