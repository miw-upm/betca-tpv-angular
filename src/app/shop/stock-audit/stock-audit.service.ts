import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {StockAudit} from "../shared/services/models/stock-audit.model";
import {Article} from "../shared/services/models/article.model";

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
          stock: 23,
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
      ] }
  ];

  private mockArticles: Article[] = [
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
      stock: 5,
      providerCompany: "Oral-B",
    },
    {
      barcode: "3542564",
      description: "Colonia",
      retailPrice: 34,
      stock: 2,
      providerCompany: "Carolina Herrera",
    },
    {
      barcode: "4124124",
      description: "Desodorante",
      retailPrice: 12,
      stock: 20,
      providerCompany: "Adidas",
    },
  ];

  constructor() {}

  search(): Observable<StockAudit[]> {
    return of(this.mockStockAudits);
  }

  create(stockAudit: StockAudit): Observable<StockAudit> {
    stockAudit.creationDate = new Date();
    stockAudit.articlesWithoutAudit = this.mockArticles;
    stockAudit.lossValue = 0;
    this.mockStockAudits.push(stockAudit);
    return of(stockAudit);
  }

  read(stockAudit: StockAudit): Observable<StockAudit> {
    return of(stockAudit);
  }

  update(stockAudit: StockAudit): Observable<StockAudit> {
    return of(stockAudit);
  }

  closeAudit(stockAudit: StockAudit): Observable<StockAudit> {
    stockAudit.closeDate = new Date();
    for (let article of stockAudit.articlesWithoutAudit) {
      stockAudit.losses.push({ barcode: article.barcode, amount: article.stock });
      stockAudit.lossValue += article.stock * article.retailPrice;
    }
    stockAudit.articlesWithoutAudit = [];
    return of(stockAudit);
  }
}
