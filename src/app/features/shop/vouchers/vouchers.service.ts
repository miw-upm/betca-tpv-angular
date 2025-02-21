import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable, of } from "rxjs";
import { VoucherSearch } from "./vouchers-search.model";
import { Voucher } from "../shared/models/voucher.model";
import BigDecimal from 'big.js';

@Injectable({ providedIn: 'root' })
export class VoucherService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(voucher: Voucher): Observable<Voucher> {
        //TODO: Implement this method and remove mock
        return of({ ...voucher, id: 'mock-id' });
    }

    read(reference: string): Observable<Voucher> {
        //TODO: Implement this method and remove mock
        return of({
            reference,
            value: new BigDecimal(0),
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
                value: new BigDecimal(0),
                creationDate: new Date(),
                dateOfUse: new Date(),
                user: null
            },
            {
                reference: 'mock-reference-2',
                value: new BigDecimal(0),
                creationDate: new Date(),
                dateOfUse: new Date(),
                user: null
            }
        ]);
    }
}