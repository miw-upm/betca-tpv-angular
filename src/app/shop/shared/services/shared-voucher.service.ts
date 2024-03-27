import {Injectable} from '@angular/core';
import {VouchersService} from 'app/shop/vouchers/vouchers.service';
import {Observable, switchMap} from 'rxjs';
import {Voucher} from './models/voucher.model';
import {VoucherCreation} from 'app/shop/vouchers/voucher-creation.model';

@Injectable({
  providedIn: 'root',
})
export class SharedVoucherService {

  constructor(private voucherService: VouchersService) {
  }

  printVoucher(value: number): Observable<void> {
    const voucher: VoucherCreation = { value: value };
    return this.voucherService.create(voucher).pipe(
      switchMap((voucher: Voucher) => this.voucherService.readReceipt(voucher.reference))
    );
  }

  consumeVoucher(reference: string): Observable<Voucher> {
    return this.voucherService.update(reference);
  }
}
