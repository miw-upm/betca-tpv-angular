import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

export type Budget = {
  reference: string;
  creationDate: Date;
  shoppings: Shopping[];
};

export type BudgetRowData = Pick<Budget, "reference" | "creationDate"> & {
  total: number;
};

export type BudgetSearch = Partial<Pick<Budget, "reference">>;
