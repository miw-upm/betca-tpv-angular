import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

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

  /*
  create(voucher: Voucher): Observable<Voucher> {
    return this.httpService
      .post(EndPoints.VOUCHERS, voucher);
  }

  read(reference: string): Observable<Voucher> {
    return this.httpService
      .get(EndPoints.PROVIDERS + '/' + reference);
  }

  search(vouchersSearch: VouchersSearch): Observable<Voucher[]> {
    return this.httpService
      .paramsFrom(vouchersSearch)
      .get(EndPoints.VOUCHERS + VouchersService.SEARCH);
  }
  */

  // Mocks
  vouchersMock: Voucher[] = [
    {
      reference: '1',
      value: 10,
      creationDate: new Date('2020-01-01'),
      dateOfUse: new Date('2020-01-02'),
      userMobile: '600000001',
    },
    {
      reference: '2',
      value: 20,
      creationDate: new Date('2020-02-01'),
      userMobile: '600000002',
    },
    {
      reference: '3',
      value: 30,
      creationDate: new Date('2020-03-01'),
      userMobile: '600000003',
    },
  ];

  create(voucher: VoucherCreation): Observable<Voucher> {
    return of(this.vouchersMock[0]);
  }

  read(reference: string): Observable<Voucher> {
    return of(this.vouchersMock.find(voucher => voucher.reference === reference));
  }

  search(vouchersSearch: VouchersSearch): Observable<Voucher[]> {
    return of(this.vouchersMock);
  }

}
