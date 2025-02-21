export interface Complaint {
    id?: string;
    mobile?: number;
    barcode: string;
    description: string;
    registrationDate?: Date;
    reply?:string;
    state?:string;
}
