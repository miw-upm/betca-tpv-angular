import {User} from "@core/models/user.model";
import {Ticket} from "../../cashier-opened/tickets/models/tickets.model";

export interface Invoice {
    identity: number;
    creationDate: Date;
    baseTax: number;
    taxValue: number;
    user: User;
    ticket: Ticket;
}

export interface InvoiceDetails {
    identity: number;
    creationDate: Date;
    baseTax: number;
    taxValue: number;
    ticketId: string;
    userMobile: number;
}