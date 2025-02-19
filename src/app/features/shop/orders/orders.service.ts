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
        return of({ ...order, id: 'mock-id' });
    }

    read(reference: string): Observable<Order> {
        return of({
            reference,
            description: 'Mock Description',
            providerCompany: 'pro1',
            openingDate: new Date(),
            closingDate: new Date(),
            orderLines: []
        });
    }

    update(oldReference: string, order: Order): Observable<Order> {
        return of({ ...order, reference: oldReference });
    }

    search(orderSearch: OrderSearch): Observable<Order[]> {
        return of([
            {
                reference: 'mock-ref-1',
                description: 'Mock Description',
                providerCompany: 'pro1',
                openingDate: new Date(),
                closingDate: new Date(),
                orderLines: []
            },
            {
                reference: 'mock-ref-2',
                description: 'Mock Description',
                providerCompany: 'pro2',
                openingDate: new Date(),
                closingDate: new Date(),
                orderLines: []
            }
        ]);
    }
}

