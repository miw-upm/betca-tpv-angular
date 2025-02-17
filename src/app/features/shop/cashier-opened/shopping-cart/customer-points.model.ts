import {User} from "./user.models";

export interface CustomerPoints {
    value: number;
    lastDate: Date;
    user: User;
}

export const CustomerPointsConstants = {
    DISCOUNT_POINTS_BARCODE: "Points Discount"
};