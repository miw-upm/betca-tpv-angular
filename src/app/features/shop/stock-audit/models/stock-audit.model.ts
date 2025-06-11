import { Article as BaseArticle } from '../../../shared/models/article.model';

/**
 * Representa una pérdida de artículo detectada en una auditoría.
 */
export interface ArticleLoss {
  barcode: string;
  amount: number;
}

/**
 * Extiende el modelo base de artículo con la cantidad real contada durante la auditoría.
 */
export interface AuditedArticle extends BaseArticle {
  stock: number;      // Stock teórico al momento de la auditoría
  real?: number;      // Cantidad real contada (puede ser null si no está auditado)
}

/**
 * Estructura principal de una auditoría de stock.
 */
export interface StockAudit {
  id: string;
  creationDate: string | Date;
  updateDate: string | Date;
  closeDate: string | Date | null;
  articlesWithoutAudit: BaseArticle[];
  lossValue: number;
  losses: ArticleLoss[];
  articlesAudited: AuditedArticle[];
}