import {TicketsComponent} from "../cashier-opened/tickets/tickets.component";
import {Ticket} from "../cashier-opened/tickets/tickets.models";

export interface CreditSale{
  ticket: Ticket;
  payed: boolean;
}
