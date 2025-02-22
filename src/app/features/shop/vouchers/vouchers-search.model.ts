import { User } from '@core/models/user.model';

export class VoucherSearch {
    reference?: string;
    value?: number;
    creationDate?: Date;
    dateOfUse?: Date;
    user?: User;
}