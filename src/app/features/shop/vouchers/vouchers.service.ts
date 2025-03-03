import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable, of } from "rxjs";
import { VoucherSearch } from "./vouchers-search.model";
import { Voucher } from "../shared/models/voucher.model";
import {EndPoints} from "@core/end-points";
import {SharedDateFormatterService} from "../shared/services/shared.date-formatter.service";

@Injectable({ providedIn: 'root' })
export class VoucherService {
    static readonly SEARCH = '/search';

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

    search(voucherSearch: VoucherSearch): Observable<Voucher[]> {
        return of([
            {
                reference: 'mock-reference-1',
                value: 0,
                creationDate: new Date(),
                dateOfUse: new Date(),
                user: null
            },
            {
                reference: 'mock-reference-2',
                value: 0,
                creationDate: new Date(),
                dateOfUse: new Date(),
                user: null
            }
        ]);
    }
}