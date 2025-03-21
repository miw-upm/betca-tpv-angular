import { Shopping } from "../../cashier-opened/shopping-cart/shopping.model";

export type Budget = {
  id: string;
  reference: string;
  creationDate: Date;
  shoppingList: Shopping[];
};

export type CreateBudget = Omit<Budget, "id" | "reference" | "creationDate">;

export type BudgetRowData = Pick<
  Budget,
  "id" | "reference" | "creationDate"
> & {
  total: number;
};

export type BudgetSearch = Pick<Budget, "reference">;
