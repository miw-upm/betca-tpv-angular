import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VATResult} from './quarter-vat.model';
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root'
})
export class QuarterVatService {

  private static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  getVatDataForQuarter(year: number, quarterNumber: number): Observable<VATResult> {
    return this.httpService
      .param("year", year.toString())
      .param("quarter", quarterNumber.toString())
      .get(EndPoints.VAT + QuarterVatService.SEARCH);
  }
}
