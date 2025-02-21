import { User } from '@core/models/user.model';
import BigDecimal from 'big.js';

export class VoucherSearch {
    reference?: string;
    value?: BigDecimal;
    creationDate?: Date;
    dateOfUse?: Date;
    user?: User;
}