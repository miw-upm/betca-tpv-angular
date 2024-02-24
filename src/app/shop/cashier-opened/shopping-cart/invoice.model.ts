import {User} from "@core/user.model";
import {Tickets} from "../tickets/tickets.model";

export interface Invoice {
  identity: number;
  creationDate: Date;
  baseTax: number;
  taxValue: number;
  user?: User;
  ticket: Tickets
}

