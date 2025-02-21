import {User} from '@core/models/user.model';

export interface CustomerPoints {
    value: number;
    lastDate: Date;
    user: User;
}

export const CustomerPointsConstants = {
    DISCOUNT_POINTS_BARCODE: "Points Discount",
    MINIMUM_POINTS_TO_REDEEM: 10
};