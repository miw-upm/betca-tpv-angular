import {User} from "@core/user.model";

export interface CustomerDiscount {
  userMobile: number;
  note?: string;
  registrationDate?: Date;
  discount?: number;
  minimumPurchase?: number;
}
