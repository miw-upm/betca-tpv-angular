import {User} from "@core/models/user.model";
import {Tickets} from "../../cashier-opened/tickets/models/tickets.model";

export interface Invoice {
    identity: number;
    creationDate: Date;
    baseTax: number;
    taxValue: number;
    user: User;
    ticket: Tickets;
}