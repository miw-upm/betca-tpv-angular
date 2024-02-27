import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {StockAudit} from "../shared/services/models/stock-audit.model";

@Injectable({
  providedIn: 'root',
})
export class StockAuditService {

  private mockStockAudits: StockAudit[] = [
    { creationDate: new Date('2020-01-01'), closeDate: null, articlesWithoutAudit: [
        {
          barcode: "123456789",
          description: "Champoo",
          retailPrice: 12,
          stock: 10,
          providerCompany: "Johnson & Johnson",
        },
        {
          barcode: "987654321",
          description: "Pasta de dientes",
          retailPrice: 8,
          stock: 5,
          providerCompany: "Colgate",
        },
        {
          barcode: "456789123",
          description: "Cepillo de dientes",
          retailPrice: 5,
          providerCompany: "Oral-B",
        }
      ], lossValue: 0, losses: [] },
    { creationDate: new Date('2020-01-03'), closeDate: new Date('2020-01-04'), articlesWithoutAudit: [], lossValue: 124, losses: [
        {
          barcode: "123456789",
          amount: 2,
        },
        {
          barcode: "987654321",
          amount: 1,
        }
      ] },
    { creationDate: new Date('2020-01-05'), closeDate: new Date('2020-01-06'), articlesWithoutAudit: [], lossValue: 0, losses: [] }
  ];

  private stockAudit: StockAudit = {
    creationDate: new Date('2020-01-01'),
    closeDate: null,
    articlesWithoutAudit: [
      {
        barcode: "3542564",
        description: "Colonia",
        retailPrice: 34,
        providerCompany: "Carolina Herrera",
      }
    ],
    lossValue: 12,
    losses: [
      {
        barcode: "4124124",
        amount: 1,
      }
    ]
  }

  constructor() {}

  search(): Observable<StockAudit[]> {
    return of(this.mockStockAudits);
  }

  create(stockAudit: StockAudit): Observable<StockAudit[]> {
    stockAudit.creationDate = new Date();
    this.mockStockAudits.push(stockAudit);
    return of(this.mockStockAudits);
  }

  read(stockAudit: StockAudit): Observable<StockAudit> {
    return of(stockAudit);
  }

  update(stockAudit: StockAudit): Observable<StockAudit> {
    // TODO: Logica de pasar los auditados a perdidos en el caso de que los haya y calculo de perdida
    return of(this.stockAudit);
  }

  closeAudit(stockAudit: StockAudit): Observable<StockAudit> {
    stockAudit.closeDate = new Date();
    // TODO: Logica de pasar los no auditados y perdidos y calculo de perdida
    return of(stockAudit);
  }
}
