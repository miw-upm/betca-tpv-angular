import {ComplaintState} from "../../shared/models/complaintState.model";

export interface ComplaintUpdateAdminModel {
    userMobile?: number;
    barcode?: string;
    description?: string;
    reply?:string;
    state?:ComplaintState;
}
