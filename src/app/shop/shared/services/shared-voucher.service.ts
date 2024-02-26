import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedVoucherService {

  printVoucher(value: number): Observable<any> {
    console.log('Printing voucher with value: ' + value);
    return EMPTY; // TODO create and print voucher
  }

  consumeVoucher(reference: string): Observable<any> {
    console.log('Consuming voucher with reference: ' + reference);
    return EMPTY; // TODO consume voucher
  }
}
