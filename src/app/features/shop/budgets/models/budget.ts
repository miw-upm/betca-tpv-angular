import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

export type Budget = {
  reference: string;
  creationDate: Date;
  shoppings: Shopping[];
};

export type BudgetSearch = Partial<Pick<Budget, "reference" | "creationDate">>;
