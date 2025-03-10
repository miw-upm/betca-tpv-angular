import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

export type Budget = {
  reference: string;
  creationDate: Date;
  shoppingList: Shopping[];
};

export type CreateBudget = Omit<Budget, "reference" | "creationDate">;

export type BudgetRowData = Pick<Budget, "reference" | "creationDate"> & {
  total: number;
};

export type BudgetSearch = Pick<Budget, "reference">;
