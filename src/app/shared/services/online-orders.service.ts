import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OnlineOrder} from "@shared/models/online-order.model";
import {OnlineOrderState} from "@shared/models/online-order-state";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";
import {AuthService} from "@core/auth.service";

@Injectable({
  providedIn: 'root',
})
export class OnlineOrdersService {
  static PERSONAL = '/personal';

  constructor(private httpService: HttpService, private auth: AuthService) {

  }

  search(): Observable<OnlineOrder[]> {
    return this.httpService
      .get(EndPoints.ONLINE_ORDERS);
  }

  searchPersonal(): Observable<OnlineOrder[]> {
    return this.httpService
      .get(EndPoints.ONLINE_ORDERS + OnlineOrdersService.PERSONAL);
  }

  update(reference: string, updatedOnlineOrder: OnlineOrder): Observable<OnlineOrder> {
    return this.httpService
      .put(EndPoints.ONLINE_ORDERS + "/" + reference, updatedOnlineOrder);
  }
}
