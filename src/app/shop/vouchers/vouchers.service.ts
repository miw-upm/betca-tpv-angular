import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Voucher} from './voucher.model';
import {VouchersSearch} from './vouchers-search.model';
import {EndPoints} from '@shared/end-points';
import {VoucherCreation} from './voucher-creation.model';

@Injectable({
  providedIn: 'root',
})
export class VouchersService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  create(voucher: VoucherCreation): Observable<Voucher> {
    return this.httpService
      .post(EndPoints.VOUCHERS, voucher);
  }

  read(reference: string): Observable<Voucher> {
    return this.httpService
      .get(EndPoints.PROVIDERS + '/' + reference);
  }

  update(reference: string) : Observable<Voucher> {
    return this.httpService
      .successful()
      .put(EndPoints.VOUCHERS + '/' + reference);
  }

  search(vouchersSearch: VouchersSearch): Observable<Voucher[]> {
    return this.httpService
      .paramsFrom(vouchersSearch)
      .get(EndPoints.VOUCHERS + VouchersService.SEARCH);
  }
}
