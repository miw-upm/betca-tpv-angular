import {User} from './user.models';
import {Shopping} from "@shared/models/shopping.model";

export interface TicketCreation {
  user?: User;
  cash: number;
  card: number;
  voucher: number;
  note: string;
  shoppingList: Shopping[];
}
