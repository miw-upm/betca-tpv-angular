import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderSearch} from "./order-search.model";
import {HttpService} from '@core/services/http.service';
import {Order} from '../shared/models/order.model';

import {EndPoints} from "@core/end-points";
import {SharedDateFormatterService} from "../shared/services/shared.date-formatter.service";
@Injectable({providedIn: 'root'})
export class OrderService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService, private readonly SharedDateFormatterService: SharedDateFormatterService) {
    }

    create(order: Order): Observable<Order> {
        const orderFormatted = {
            ...order,
            openingDate: this.SharedDateFormatterService.formatDate(order.openingDate),
        };
        return this.httpService
            .post(EndPoints.ORDERS, orderFormatted);
    }

    read(reference: string): Observable<Order> {
        return this.httpService
            .error("Order not found.")
            .get(EndPoints.ORDERS + '/' + reference);
    }

    update(oldReference: string, order: Order): Observable<Order> {
        const orderFormatted = {
            ...order,
            openingDate: this.SharedDateFormatterService.formatDate(order.openingDate),
        };

        return this.httpService
            .successful("Order updated successfully.")
            .error('Order update failed. Please check the values and try again.')
            .put(EndPoints.ORDERS + '/' + oldReference, orderFormatted);
    }

    search(orderSearch: OrderSearch): Observable<Order[]> {
        return this.httpService
        .paramsFrom(orderSearch)
        .get(EndPoints.ORDERS + OrderService.SEARCH);
    }

    delete(reference: string): Observable<void> {
        return this.httpService
        .delete(EndPoints.ORDERS + '/' + reference);
    }
}

