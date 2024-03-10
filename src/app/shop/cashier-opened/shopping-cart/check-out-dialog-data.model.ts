import {Shopping} from "./shopping.model";

export interface CheckOutDialogDataModel{
  shoppingCart: Shopping[];
  mobile?: string;
}
