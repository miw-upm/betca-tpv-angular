import {CreditSale} from './credit-sale.model';

export interface CreditLine{
  reference?: string;
 // user: User;
  mobile : string;
  sales?: CreditSale[];
}
