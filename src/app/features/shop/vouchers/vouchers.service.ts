import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable, of } from "rxjs";
import { VoucherSearch } from "./vouchers-search.model";
import { Voucher } from "../shared/models/voucher.model";
import {EndPoints} from "@core/end-points";

@Injectable({ providedIn: 'root' })
export class VoucherService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(voucher: Voucher): Observable<Voucher> {
        const formattedVoucher = {
            ...voucher,
            creationDate: this.formatDate(voucher.creationDate),
            dateOfUse: this.formatDate(voucher.dateOfUse),
        };
        return this.httpService
            .post(EndPoints.VOUCHERS, formattedVoucher);
    }

    read(reference: string): Observable<Voucher> {
        //TODO: Implement this method and remove mock
        return of({
            reference,
            value: 0,
            creationDate: new Date(),
            dateOfUse: new Date(),
            user: null
        });
    }

    update(oldReference: string, voucher: Voucher): Observable<Voucher> {
        //TODO: Implement this method and remove mock
        return of({ ...voucher, reference: oldReference });
    }

    search(voucherSearch: VoucherSearch): Observable<Voucher[]> {
        //TODO: Implement this method and remove mock
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

    private formatDate(dateStr: Date | null) {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
    }
}