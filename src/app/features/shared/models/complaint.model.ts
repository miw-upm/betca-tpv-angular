import {ComplaintState} from "./complaintState.model";

export interface Complaint {
    trackingCode?: string;
    userMobile?: number;
    barcode: string;
    description: string;
    registrationDate?: Date;
    reply?:string;
    state?:ComplaintState;
}
