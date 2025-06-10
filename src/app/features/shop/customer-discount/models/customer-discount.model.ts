import {User} from "@core/models/user.model";

export interface CustomerDiscount {
    user: User;
    note: string;
    registrationDate: Date;
    discount: number;
    minimumPurchase: number;
}

export interface FormattedCustomerDiscount {
  mobile: number;
  note: string;
  registrationDate: Date;
  discount: number;
  minimumPurchase: number;
}