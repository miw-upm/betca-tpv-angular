import {Article} from "../shared/article.model";
import {ShoppingState} from "../../shop/cashier-opened/shopping-cart/shopping-state.model";

export class Shopping {
  amount: number;
  discount: number;
  total: number;
  state: ShoppingState;


  constructor(public barcode: string ,public article : Article,public retailPrice: number) {
    this.amount = 1;
    this.discount = 0;
    this.total = this.retailPrice * this.amount * (1 - this.discount / 100);
    this.state = ShoppingState.COMMITTED;
  }
}
