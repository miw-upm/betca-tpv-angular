import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { VoucherSearch } from "./vouchers-search.model";
import { Voucher } from "../shared/models/voucher.model";
import {EndPoints} from "@core/end-points";
import {SharedDateFormatterService} from "../shared/services/shared.date-formatter.service";

@Injectable({ providedIn: 'root' })
export class VoucherService {
    static readonly SEARCH = '/search';
    static readonly PDF = '/pdf';

    constructor(private readonly httpService: HttpService, private readonly SharedDateFormatterService: SharedDateFormatterService) {
    }

    create(voucher: Voucher): Observable<Voucher> {
        const formattedVoucher = {
            ...voucher,
            creationDate: this.SharedDateFormatterService.formatDate(voucher.creationDate),
            dateOfUse: this.SharedDateFormatterService.formatDate(voucher.dateOfUse),
        };
        return this.httpService
            .post(EndPoints.VOUCHERS, formattedVoucher);
    }

    read(reference: string): Observable<Voucher> {
        return this.httpService
            .error("Voucher not found.")
            .get(EndPoints.VOUCHERS+"/"+reference)
    }

    update(voucher: Voucher, dateOfUse: Date, value: number): Observable<Voucher>{
        voucher.user.token=''
        const formatedVoucher = {
            ...voucher,
            dateOfUse: this.SharedDateFormatterService.formatDate(dateOfUse),
            value: value,
        }
        return this.httpService
            .successful("Voucher updated successfully.")
            .error('Voucher update failed. Please check the values and try again.')
            .put(EndPoints.VOUCHERS + '/' + voucher.reference, formatedVoucher);
    }

    search(voucherSearch: VoucherSearch): Observable<Voucher[]> {
        return this.httpService
            .paramsFrom(voucherSearch)
            .get(EndPoints.VOUCHERS + VoucherService.SEARCH);
    }

    printPdf(reference: string): Observable<any> {
        return this.httpService.pdf().get(EndPoints.VOUCHERS + '/' + reference + VoucherService.PDF);
    }
}