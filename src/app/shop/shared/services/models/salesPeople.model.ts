import {User} from "../../../cashier-opened/shopping-cart/user.models";
import {TicketCreation} from "../../../cashier-opened/shopping-cart/ticket-creation.model";
import {Ticket} from "../../../cashier-opened/tickets/tickets.models";


export interface Salesperson {
  ticket: Ticket;
  salesperson: User;
}
