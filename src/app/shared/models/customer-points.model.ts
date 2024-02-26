import {User} from "@core/user.model";


export interface CustomerPoints {
  value: number;
  lastDate: Date;
  user: User
}
export const CustomerPointsConstants = {
  BARCODE: "POINTS_DISCOUNT_ARTICLE"
}
