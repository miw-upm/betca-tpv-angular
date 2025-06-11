import {MovementTypes} from "../cash-movement-dialog/MovementTypes";

export interface CashMovement {
    type: MovementTypes,
    amount: number,
    comment: string
}