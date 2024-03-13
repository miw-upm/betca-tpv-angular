import {Shopping} from "./shopping.model";

export interface Budget {
  reference?: string;
  creationDate?: Date;
  shoppingList: Shopping[];
}
