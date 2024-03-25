import { OrderLine } from "./orderline.model";

export interface Order {
  reference: string;
  description: string;
  providerCompany: string;
  openingDate?: Date;
  closingDate?: Date;
  orderLines: OrderLine[];
}
