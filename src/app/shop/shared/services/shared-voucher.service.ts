import {Injectable} from '@angular/core';
import {VouchersService} from 'app/shop/vouchers/vouchers.service';
import {EMPTY, Observable} from 'rxjs';
import {Voucher} from './models/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class SharedVoucherService {

  constructor(private voucherService: VouchersService) {
  }

  printVoucher(value: number): Observable<any> {
    console.log('Printing voucher with value: ' + value);
    return EMPTY; // TODO create and print voucher
  }

  consumeVoucher(reference: string): Observable<Voucher> {
    return this.voucherService.update(reference);
  }
}
