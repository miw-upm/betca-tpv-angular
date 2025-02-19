import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

export interface Budget {
  reference: string;
  creationDate: Date;
  shoppings: Shopping[];
}
