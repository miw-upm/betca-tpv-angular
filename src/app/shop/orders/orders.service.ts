import { Injectable } from '@angular/core';
import { Order } from "./order.model";
import { Observable, take } from "rxjs";
import { OrderSearch } from "./ordersearch.model";
import { HttpService } from "@core/http.service";
import { EndPoints } from "@shared/end-points";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private static SEARCH = '/search';

  constructor(private http: HttpService) {
  }

  public readByReference(reference: string): Observable<Order> {
    return this.http.get(`${EndPoints.ORDERS}/${reference}`).pipe(
      take(1) // take the first value and complete
    );
  }

  public search(orderSearch: OrderSearch): Observable<Order[]> {
    const orderSearchInstance: OrderSearch = { ...orderSearch };
    orderSearchInstance.openingDate = orderSearch.openingDate ? orderSearch.openingDate.valueOf() : undefined;
    orderSearchInstance.closingDate = orderSearch.closingDate ? orderSearch.closingDate.valueOf() : undefined;

    return this.http
      .paramsFrom(orderSearchInstance)
      .get(EndPoints.ORDERS + OrdersService.SEARCH)
      .pipe(
        take(1)
      )
  }

  public create(order: Order): Observable<Order> {
    return this.http
      .post(EndPoints.ORDERS, order)
      .pipe(
        take(1)
      );
  }

  public update(reference: string, order: Order): Observable<Order> {
    return this.http
      .put(`${EndPoints.ORDERS}/${reference}`, order)
      .pipe(
        take(1)
      );
  }

  public delete(reference: string): Observable<void> {
    return this.http
      .delete(`${EndPoints.ORDERS}/${reference}`)
      .pipe(
        take(1)
      );
  }
}
