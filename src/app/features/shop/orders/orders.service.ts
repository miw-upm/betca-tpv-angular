import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OrderSearch} from "./order-search.model";
import {HttpService} from '@core/services/http.service';
import {Order} from '../shared/models/order.model';

@Injectable({providedIn: 'root'})
export class OrderService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(order: Order): Observable<Order> {
        return of({ ...order});
    }

    delete(order: Order): Observable<Order> {
        return of({ ...order});
    }

    read(reference: string): Observable<Order> {
        return of({
            reference,
            description: 'Mock Description',
            providerCompany: 'pro1',
            openingDate: new Date(),
            closingDate: new Date(),
            orderLines: [{
                articleBarcode: 'mock-barcode',
                requiredAmount: 4,
                finalAmount: 2
            },
            {
                articleBarcode: 'mock-2',
                requiredAmount: 3,
                finalAmount: 1
            }]
        });
    }

    update(oldReference: string, order: Order): Observable<Order> {
        return of({ ...order, reference: oldReference });
    }

    search(orderSearch: OrderSearch): Observable<Order[]> {
        return of([
            {
                reference: 'mock-ref-1',
                description: 'Mock ggg',
                providerCompany: 'pro1',
                openingDate: new Date(),
                closingDate: new Date(),
                orderLines: [{
                    articleBarcode: 'mock-barcode',
                    requiredAmount: 4,
                    finalAmount: 2
                },
                {
                    articleBarcode: 'mock-2',
                    requiredAmount: 3,
                    finalAmount: 1
                }]
            },
            {
                reference: 'mock-ref-2',
                description: 'Mock Description',
                providerCompany: 'pro2',
                openingDate: new Date(),
                closingDate: undefined,
                orderLines: [{
                    articleBarcode: 'mock-barcode',
                    requiredAmount: 4,
                    finalAmount: 2
                },
                {
                    articleBarcode: 'mock-2',
                    requiredAmount: 3,
                    finalAmount: 1
                }]
            }
        ]);
    }
}

