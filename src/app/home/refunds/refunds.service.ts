import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {OnlineOrder} from "@shared/models/online-order.model";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class RefundsService {
  static USER = '/user';

  constructor(private httpService: HttpService) {

  }

  searchUserRefunds(): Observable<OnlineOrder[]> {
    return this.httpService
      .get(EndPoints.REFUNDS + RefundsService.USER);
  }

  updateOnlineOrderState(reference: string, updatedOnlineOrder: OnlineOrder): Observable<OnlineOrder> {
    return this.httpService.put(EndPoints.ONLINE_ORDERS + "/" + reference, updatedOnlineOrder);
  }
}
