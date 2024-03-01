import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpService } from '@core/http.service';
import { CustomerDiscount } from './customer-discount.model';
import { EndPoints } from '@shared/end-points';
import { User } from "@core/user.model";
import { CustomerDiscountSearch } from './customer-discount-search.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerDiscountService {
  static SEARCH = '/search';

  private mockDiscounts: CustomerDiscount[] = [
    {
      userMobile: 11111,
      note: 'Mock discount for user 1',
      registrationDate: new Date(),
      discount: 10,
      minimumPurchase: 100
    },
    {
      userMobile: 22222,
      note: 'Mock discount for user 2',
      registrationDate: new Date(),
      discount: 15,
      minimumPurchase: 200
    }
  ];

  constructor(private httpService: HttpService) {}

  // Método para crear un descuento de cliente
  create(customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
    // Simulación de la creación con datos simulados (mock)
    return of(customerDiscount).pipe(delay(500)); // Simula un retraso de 0.5 segundos
  }

  // Método para leer un descuento de cliente
  read(userId: number): Observable<CustomerDiscount> {
    // Simulación de la lectura con datos simulados (mock)
    const mockDiscount: CustomerDiscount = {
      userMobile: userId,
      note: 'Mock discount for user ' + userId,
      registrationDate: new Date(),
      discount: 10,
      minimumPurchase: 100
    };
    return of(mockDiscount).pipe(delay(500)); // Simula un retraso de 0.5 segundos
  }

  // Método para actualizar un descuento de cliente
  update(oldUserId: number, customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
    const index = this.mockDiscounts.findIndex(d => d.userMobile === oldUserId);

    if (index !== -1) {
      this.mockDiscounts[index] = customerDiscount;
      return of(this.mockDiscounts[index]).pipe(delay(500));
    } else {
      return throwError('Customer discount not found for update');
    }
  }


  // Método para buscar descuentos de cliente
  search(customerDiscountSearch: CustomerDiscountSearch): Observable<CustomerDiscount[]> {
    return of(this.mockDiscounts).pipe(delay(1000));
  }
}
