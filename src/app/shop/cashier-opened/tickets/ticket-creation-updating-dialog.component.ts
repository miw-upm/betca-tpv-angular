import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TicketService} from "./tickets.service";
import {Ticket} from "./tickets.models";
import {Shopping} from "@shared/models/shopping.model";
import {ShoppingState} from "../shopping-cart/shopping-state.model";
import {CashierClosureService} from "../cashier-closure/cashier-closure.service";
import {Observable} from "rxjs";
import {CashierState} from "../cashier-closure/cashier-state.model";

@Component({
  templateUrl: 'ticket-creation-updating-dialog.component.html',
  styleUrls: ['ticket-dialog.component.css']
})

export class TicketCreationUpdatingDialogComponent {
  ticket: Ticket;
  title: string;
  cashierState: Observable<CashierState>;
  constructor(@Inject(MAT_DIALOG_DATA) data: Ticket, private ticketService: TicketService, private dialog: MatDialog, private cashierClosureService: CashierClosureService) {
    this.title = 'Update Ticket';
    this.ticket = data;
    this.cashierState = this.cashierClosureService.readState();

  }
  update(): void {
    this.ticketService
      .update(this.ticket)
      .subscribe(() => this.dialog.closeAll());
  }

  decreaseAmount(item: Shopping) {
    this.cashierState.subscribe(response => {
      if(response.opened) {
        if (item.amount > 0 && item.state === ShoppingState.NOT_COMMITTED) {
          item.amount--;
        }else if(item.state === ShoppingState.COMMITTED) {
          this.ticketService.printVoucher(item.total);
        }
      }
    })

  }

  getStateDescription(state: ShoppingState): string {
    switch(state) {
      case ShoppingState.NOT_COMMITTED:
        return 'Not Committed';
      case ShoppingState.REQUIRE_PROVIDER:
        return 'Require Provider';
      case ShoppingState.IN_STOCK:
        return 'In Stock';
      case ShoppingState.COMMITTED:
        return 'Committed';
      default:
        return 'Unknown State';
    }
  }
}
