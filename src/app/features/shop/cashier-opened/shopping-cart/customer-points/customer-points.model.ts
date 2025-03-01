import {User} from '../user.models';

export interface CustomerPoints {
    value: number;
    lastDate: Date;
    user: User;
}

export const CustomerPointsConstants = {
    MINIMUM_POINTS_TO_REDEEM: 10
};