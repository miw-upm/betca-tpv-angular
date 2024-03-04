import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '@core/http.service';
import { Salesperson } from '../shared/services/models/salesPeople.model';
import {SalesPeopleSearch1} from "./salesPeople-search1.model";
import {SalesPeopleSearch2} from "./salesPeople-search2.model";
import {ArticleSearch} from "../articles/article-search.model";
import {Article} from "../shared/services/models/article.model";
import {EndPoints} from "@shared/end-points";
import {Ticket} from "../cashier-opened/tickets/tickets.models";
import {TicketCreation} from "../cashier-opened/shopping-cart/ticket-creation.model";
import {Provider} from "../providers/provider.model";
@Injectable({
  providedIn: 'root'
})
export class SalesPeopleService {

  private salesPersons1: Salesperson[] = [];
  private salesPersons2: Salesperson[] = [];

  static SEARCH = '/search';


  constructor(private httpService: HttpService) {

  }

  searchBySalesPeopleMobileAndCreationDateBetween(salesPeopleSearch1: SalesPeopleSearch1): Observable<Salesperson[]> {
    return this.httpService
      .paramsFrom(salesPeopleSearch1)
      .get(EndPoints.SALESPEOPLE + SalesPeopleService.SEARCH);
  }

  //NOT IMPLEMENTED
  searchByMonth(salesPeopleSearch2: SalesPeopleSearch2): Observable<Salesperson[]> {
    return this.httpService
      .paramsFrom(salesPeopleSearch2)
      .get(EndPoints.SALESPEOPLE + SalesPeopleService.SEARCH);
  }


}
