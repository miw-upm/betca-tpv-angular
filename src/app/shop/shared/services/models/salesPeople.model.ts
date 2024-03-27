import {User} from "@core/user.model";
import {Ticket} from "../../../cashier-opened/tickets/tickets.models";


export interface Salesperson {
  ticket: Ticket;
  salesperson: User;
}
