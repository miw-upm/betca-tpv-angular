import {Injectable} from '@angular/core';
import {Moment} from "moment";
import {HttpService} from "@core/services/http.service";
import {EndPoints} from "@core/end-points";
import {Observable} from "rxjs";
import {DetailedCashierClosure} from "./detailed-cashier-closure";

@Injectable({
    providedIn: 'root'
})
export class CashierClosureHistoryService {

    constructor(private readonly httpService: HttpService) {
    }

    public findCahierClosuresByDateBetween(start: Moment, end: Moment): Observable<DetailedCashierClosure[]> {
        return this.httpService.get(EndPoints.CASHIERS_CLOSED_BETWEEN + '?from=' + start.format('YYYY-MM-DD') + '&to=' + end.format('YYYY-MM-DD'));
    }

}
