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
      .update(this.ticket.id, this.ticket)
      .subscribe(() => this.dialog.closeAll());
  }

  decreaseAmount(item: Shopping) {
    if (item.amount > 0 && this.getStateDescription(item.state) === 'Not Committed') {
      item.amount--;
    }else if(this.getStateDescription(item.state) === 'Committed') {
      item.amount--;
    }
  }

  getStateDescription(state: ShoppingState | string): string {
    let stateValue: ShoppingState;

    if (typeof state === 'string') {
      stateValue = ShoppingState[state as keyof typeof ShoppingState];
    } else {
      stateValue = state;
    }

    switch (stateValue) {
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

  isNotCommitted(state: ShoppingState) {
    return this.getStateDescription(state) === 'Not Committed'
  }

  isCommitted(state: ShoppingState) {
    return this.getStateDescription(state) === 'Committed'
  }
}
