
import {OrderLine} from "./order-line.model";

export interface Order {
    reference: string;
    description: string;
    providerCompany: string;
    openingDate: Date;
    closingDate: Date;
    orderLines: OrderLine[];
}