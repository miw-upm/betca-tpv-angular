import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '@core/http.service';
import {Salesperson} from '../shared/services/models/salesPeople.model';
import {SalesPeopleSearch1} from "./salesPeople-search1.model";
import {SalesPeopleSearch2} from "./salesPeople-search2.model";
import {EndPoints} from "@shared/end-points";
import {User} from "@core/user.model";

@Injectable({
  providedIn: 'root'
})
export class SalesPeopleService {


  static SEARCH = '/search';
  static DATE = "/byDate";
  static MONTH = "/byMonth";

  constructor(private httpService: HttpService) {

  }

  searchBySalesPeopleMobileAndCreationDateBetween(salesPeopleSearch1: SalesPeopleSearch1): Observable<Salesperson[]> {
    return this.httpService
      .paramsFrom(salesPeopleSearch1)
      .get(EndPoints.SALESPEOPLE + SalesPeopleService.SEARCH + SalesPeopleService.DATE);
  }

  searchByMonth(salesPeopleSearch2: SalesPeopleSearch2): Observable<Salesperson[]> {
    return this.httpService
      .paramsFrom(salesPeopleSearch2)
      .get(EndPoints.SALESPEOPLE + SalesPeopleService.SEARCH + SalesPeopleService.MONTH);
  }

  searchSalespersonByMobile(mobile:string):Observable<User>{
    return this.httpService
      .get(EndPoints.USERS + '/' + mobile);
  }

  }

