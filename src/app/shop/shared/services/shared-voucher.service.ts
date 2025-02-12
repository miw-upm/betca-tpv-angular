import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedVoucherService {

    printVoucher(value: number): Observable<any> {
        return EMPTY; // TODO create and print voucher
    }
}
