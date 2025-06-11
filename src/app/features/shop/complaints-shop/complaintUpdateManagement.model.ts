import {ComplaintState} from "../../shared/models/complaintState.model";

export interface ComplaintUpdateManagementModel {
    reply?:string;
    state?:ComplaintState;
}
