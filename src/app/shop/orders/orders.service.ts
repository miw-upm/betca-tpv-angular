import { Injectable } from '@angular/core';
import { Order } from "./order.model";
import { Observable, of } from "rxjs";
import { OrderSearch } from "./ordersearch.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orderMock: Order[] = [
    {
      reference: "1",
      description: "Order 1",
      providerCompany: "pro1",
      openingDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      closingDate: new Date(),
      orderLines: [
        { articleBarcode: "8400000000017", requiredAmount: 10, finalAmount: 10 },
        { articleBarcode: "8400000000024", requiredAmount: 20, finalAmount: 19 },
        { articleBarcode: "8400000000031", requiredAmount: 30, finalAmount: 28 },
      ]
    },
    {
      reference: "2",
      description: "Order 2",
      providerCompany: "pro3",
      openingDate: new Date(),
      orderLines: [
        { articleBarcode: "8400000000048", requiredAmount: 40 },
        { articleBarcode: "8400000000055", requiredAmount: 50 },
        { articleBarcode: "8400000000062", requiredAmount: 60 },
        { articleBarcode: "8400000000079", requiredAmount: 70 }
      ]
    }
  ];

  constructor() {
  }

  public read(reference: string): Observable<Order> {
    return of(this.orderMock.find(order => order.reference === reference));
  }

  public search(orderSearch: OrderSearch): Observable<Order[]> {
    return of(this.orderMock.filter(order => !(orderSearch.reference && order.reference !== orderSearch.reference)));
  }

  public create(order: Order): Observable<Order> {
    order.reference = `Mock${this.orderMock.length + 1}`;
    order.openingDate = new Date();
    this.orderMock.push(order);
    return of(order);
  }

  public update(oldReference: string, order: Order): Observable<Order> {
    const index = this.orderMock.findIndex(order => order.reference === oldReference);
    this.orderMock[index] = order;
    return of(order);
  }

  public delete(reference: string): Observable<void> {
    const index = this.orderMock.findIndex(order => order.reference === reference);
    this.orderMock.splice(index, 1);
    return of();
  }
}
