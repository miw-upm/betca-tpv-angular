import {Shopping} from "@shared/models/shopping.model";

export interface Budget {
  reference?: string;
  creationDate?: Date;
  shoppings: Shopping[];
}
