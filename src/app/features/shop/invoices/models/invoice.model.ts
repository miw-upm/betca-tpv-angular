import {User} from "@core/models/user.model";
import {TicketCreation} from "../../cashier-opened/shopping-cart/ticket-creation.model";

export interface Invoice {
    identity: number;
    creationDate: Date;
    baseTax: number;
    taxValue: number;
    user: User;
    ticketCreation: TicketCreation;
}