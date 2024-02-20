import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {QuarterVatResult} from './quarter-vat.model';
import {Tax} from "../shared/services/models/Tax";


@Injectable({
  providedIn: 'root'
})
export class QuarterVatService {

  constructor() {
  }

  getVatDataForQuarter(year: number, quarterNumber: number): Observable<QuarterVatResult> {
    const mockData = {
      [Tax.GENERAL]: {baseTax: 1000, valueTax: 210},
      [Tax.REDUCED]: {baseTax: 500, valueTax: 40},
      [Tax.SUPER_REDUCED]: {baseTax: 200, valueTax: 10}
    };

    const totalBaseTax = Object.values(mockData).reduce((sum, current) => sum + current.baseTax, 0);
    const totalValueTax = Object.values(mockData).reduce((sum, current) => sum + current.valueTax, 0);

    const result: QuarterVatResult = {
      year: year,
      quarter: `${quarterNumber}`,
      taxes: mockData,
      totalBaseTax: totalBaseTax,
      totalValueTax: totalValueTax
    };

    return of(result);
  }
}
