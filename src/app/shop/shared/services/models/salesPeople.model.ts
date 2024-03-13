import {User} from "@shared/models/user.models";
import {Ticket} from "../../../cashier-opened/tickets/tickets.models";


export interface Salesperson {
  ticket: Ticket;
  salesperson: User;
}
