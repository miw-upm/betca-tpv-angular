import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {EndPoints} from "@core/end-points";
import {Observable} from "rxjs";
import {CashMovement} from "../cashier-closure/cash-movement.model";
import {CashierState} from "../cashier-closure/cashier-state.model";

@Injectable({
    providedIn: 'root'
})
export class CashMovementService {

    constructor(private readonly httpService: HttpService) {
    }

    addMovement(movement: CashMovement): Observable<CashierState> {
        return this.httpService.post(EndPoints.CASHIERS_CASH_MOVEMENT, movement);
    }

}
