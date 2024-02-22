import {User} from "@core/user.model";
import {TicketCreation} from "./ticket-creation.model";
export interface Invoice {
  identity: number;
  creationDate: Date;
  baseTax: number;
  taxValue: number;
  user?: User;
  ticket: TicketCreation
}

