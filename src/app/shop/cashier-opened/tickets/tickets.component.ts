import {Component, OnInit} from '@angular/core';
import {TicketService} from "./tickets.service";
import {Ticket} from "./tickets.models";
import {Observable, of} from "rxjs";
import {ShoppingState} from "../shopping-cart/shopping-state.model";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TicketCreationUpdatingDialogComponent} from "./ticket-creation-updating-dialog.component";
@Component({
  selector: 'app-ticket',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets= of([]);
  searchQuery: string = '';
  searchByGiftTicketReference: string = '';
  shoppingStates: any
  title = 'Ticket management';

  constructor(private ticketService: TicketService,
              private dialog: MatDialog) {
    this.shoppingStates = Object.keys(ShoppingState).map(key => ShoppingState[key]);
  }

  ngOnInit(): void {
  }

  search(): void {
    this.tickets = this.ticketService.search(this.searchQuery)
  }

  searchByGiftTicket(): void {
    this.tickets = this.ticketService.searchByGiftTicket(this.searchByGiftTicketReference)
  }

  read(ticket: Ticket): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Ticket Details',
        object: this.ticketService.read(ticket.id)
      }
    });
  }

  resetSearch(): void {
    this.searchQuery = null;
    this.searchByGiftTicketReference = null;
  }

  update(ticket: Ticket): void {
    this.ticketService.read(ticket.id)
      .subscribe(fullTicket => this.dialog.open(TicketCreationUpdatingDialogComponent, {data: fullTicket}));
  }

}
