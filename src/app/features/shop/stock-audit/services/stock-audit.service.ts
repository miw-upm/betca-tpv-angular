import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { StockAudit } from '../models/stock-audit.model';
import { Observable } from 'rxjs';
import { EndPoints } from '@core/end-points';

@Injectable({
  providedIn: 'root'
})
export class StockAuditService {

  constructor(private readonly httpService: HttpService) {
  }

  findAll(): Observable<StockAudit[]> {
    return this.httpService
      .get(EndPoints.STOCK_AUDITS);
  }

  create(): Observable<void>{
    return this.httpService.post(EndPoints.STOCK_AUDITS); 
  }

}
