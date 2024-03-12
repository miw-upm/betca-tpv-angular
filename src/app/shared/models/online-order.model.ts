import {OnlineOrderState} from "./online-order-state";
import {Ticket} from "../../shop/cashier-opened/tickets/tickets.models";

export interface OnlineOrder {reference:string; state:OnlineOrderState; deliveryDate:Date; ticket:Ticket;}
