import {Article} from "../shared/article.model";

export class Shopping {
  amount: number;


  constructor(public article : Article) {
    this.amount = 1;
  }
}
