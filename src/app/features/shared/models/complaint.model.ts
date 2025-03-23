export interface Complaint {
    trackingCode?: string;
    userMobile?: number;
    barcode: string;
    description: string;
    registrationDate?: Date;
    reply?:string;
    state?:string;
}
