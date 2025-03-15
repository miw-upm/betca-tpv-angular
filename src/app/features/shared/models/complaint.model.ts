export interface Complaint {
    id?: string;
    userMobile?: number;
    barcode: string;
    description: string;
    registrationDate?: Date;
    reply?:string;
    state?:string;
}
