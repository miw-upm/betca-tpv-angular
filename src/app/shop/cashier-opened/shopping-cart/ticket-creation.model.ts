import {Shopping} from './shopping.model';
import {User} from './user.models';

export interface TicketCreation {
  user?: User;
  cash: number;
  card: number;
  voucher: number;
  note: string;
  shoppingList: Shopping[];
}
