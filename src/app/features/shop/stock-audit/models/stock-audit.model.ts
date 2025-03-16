export interface ArticleLoss {
  barcode: string;
  amount: number;
}

export interface Article {
  barcode: string;
  description: string;
  stock: number;
}

export interface StockAudit {
  id: string;
  creationDate: Date;
  closeDate: Date;
  articlesWithoutAudit: Article[];
  lossValue: number;
  losses: ArticleLoss[];
}