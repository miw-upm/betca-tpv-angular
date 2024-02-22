import { User } from "@core/user.model";

export interface Voucher {
    reference: string;
    value: number;
    creationDate: Date;
    dateOfUse?: Date;
    user: User;
}