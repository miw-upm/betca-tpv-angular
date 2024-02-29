import {User} from "../../../cashier-opened/shopping-cart/user.models";
import {TicketCreation} from "../../../cashier-opened/shopping-cart/ticket-creation.model";


export interface Salesperson {
  ticket: TicketCreation;
  salesperson: User;
}
