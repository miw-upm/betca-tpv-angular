import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {OnlineOrder} from "@shared/models/online-order.model";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class RefundsService {
  static ADMIN = '/admin';

  constructor(private httpService: HttpService) {

  }

  searchAdminRefunds(): Observable<OnlineOrder[]> {
    return this.httpService
      .get(EndPoints.REFUNDS + RefundsService.ADMIN);
  }
}
