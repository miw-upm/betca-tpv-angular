import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {StockAudit} from "../shared/services/models/stock-audit.model";
import {Article} from "../shared/services/models/article.model";
import {HttpService} from "@core/http.service";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class StockAuditService {

  constructor(private httpService: HttpService) {}

  readAll(): Observable<StockAudit[]> {
    return this.httpService
      .get(EndPoints.STOCK_AUDITS);
  }

  read(stockAudit: StockAudit): Observable<StockAudit> {
    return this.httpService
      .get(EndPoints.STOCK_AUDITS + '/' + stockAudit.id);
  }

  create(): Observable<StockAudit> {
    return this.httpService
      .post(EndPoints.STOCK_AUDITS)
  }

  update(stockAudit: StockAudit): Observable<StockAudit> {
    return this.httpService
      .put(EndPoints.STOCK_AUDITS + '/' + stockAudit.id, stockAudit);
  }

  close(stockAudit: StockAudit) {
    return this.httpService
      .put(EndPoints.STOCK_AUDITS + '/' + stockAudit.id + '/close', stockAudit);
  }
}
