import {Shopping} from "../../shopping-cart/shopping.model";

export interface Tickets {
    reference: string;
}

export interface Ticket {
    id: string;
    reference: string;
    shoppingList: Shopping[];
    creationDate: Date;
    cash: string;
    card: string;
    voucher: string;
    note: string;
    userMobile: string;
    class: string;
}