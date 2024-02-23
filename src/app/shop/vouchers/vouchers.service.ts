import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Voucher} from './voucher.model';
import {VouchersSearch} from './vouchers-search.model';
import {EndPoints} from '@shared/end-points';

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
      user: {
        token: 'user1',
     },
    },
    {
      reference: '2',
      value: 20,
      creationDate: new Date('2020-02-01'),
      user: {
        token: 'user2',
      },
    },
    {
      reference: '3',
      value: 30,
      creationDate: new Date('2020-03-01'),
      user: {
        token: 'user3',
      },
    },
  ];

  create(voucher: Voucher): Observable<Voucher> {
    this.vouchersMock.push(voucher);
    return of(voucher);
  }

  read(reference: string): Observable<Voucher> {
    return of(this.vouchersMock.find(voucher => voucher.reference === reference));
  }

  search(vouchersSearch: VouchersSearch): Observable<Voucher[]> {
    return of(this.vouchersMock);
  }

}
