export interface Voucher {
    reference: string;
    value: number;
    creationDate: Date;
    dateOfUse?: Date;
    userMobile: string;
}