import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OnlineOrder} from "@shared/models/online-order.model";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class OnlineOrdersService {
  static PERSONAL = '/personal';

  constructor(private httpService: HttpService) {

  }

  searchPersonal(): Observable<OnlineOrder[]> {
    return this.httpService
      .get(EndPoints.ONLINE_ORDERS + OnlineOrdersService.PERSONAL);
  }
}
