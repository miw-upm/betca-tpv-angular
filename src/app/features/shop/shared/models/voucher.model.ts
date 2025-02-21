import { User } from '@core/models/user.model';

export interface Voucher {
    reference: string;
    value: number;
    creationDate: Date;
    dateOfUse: Date;
    user: User;
}