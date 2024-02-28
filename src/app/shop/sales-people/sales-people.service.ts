import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '@core/http.service';
import { Salesperson } from '../shared/services/models/salesPeople.model';
import {SalesPeopleSearch1} from "./salesPeople-search1.model";
import {SalesPeopleSearch2} from "./salesPeople-search2.model";
@Injectable({
  providedIn: 'root'
})
export class SalesPeopleService {

  private salesPersons1: Salesperson[] = [];
  private salesPersons2: Salesperson[] = [];
  constructor() {
    let newSalesPerson: Salesperson = {
      salesperson: {mobile: Number("000000000")},
      ticket: {cash:0,card:0,voucher:0,note:'',shoppingList:[]}
    };
    this.salesPersons1.push(newSalesPerson);

    newSalesPerson = {
      salesperson: {mobile: Number("111111111")},
      ticket: {cash:1,card:1,voucher:1,note:'',shoppingList:[]}
    };
    this.salesPersons2.push(newSalesPerson);
  }

  search1(salesPeopleSearch1: SalesPeopleSearch1): Observable<Salesperson[]> {
    return of(this.salesPersons1);
  }

  search2(salesPeopleSearch2: SalesPeopleSearch2): Observable<Salesperson[]> {
    return of(this.salesPersons2);
  }

}





