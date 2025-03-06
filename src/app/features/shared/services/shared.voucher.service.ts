import {Injectable} from '@angular/core';
import {VoucherService} from "../../shop/vouchers/vouchers.service";
import {Voucher} from "../../shop/shared/models/voucher.model";

@Injectable({providedIn: 'root'})
export class SharedVoucherService {

    constructor(private readonly voucherService: VoucherService) {
    }

    createAndPrintVoucher(voucher: Voucher){
        this.voucherService.create(voucher)
            .subscribe(
                voucher => {
                    if (voucher) {
                        this.voucherService.printPdf(voucher.reference).subscribe()
                    }
                }
            );
    }

}
