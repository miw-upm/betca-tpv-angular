import {OnlineOrderState} from "./online-order-state";

export interface OnlineOrder {reference:string; state:OnlineOrderState; deliveryDate:Date; ticketReference:string;}
