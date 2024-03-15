import {Shopping} from "@shared/models/shopping.model";

export interface CheckOutDialogDataModel{
  shoppingCart: Shopping[];
  mobile?: string;
}
