import {ArticleLoss} from "./article-loss.model";
import {Article} from "./article.model";

export interface StockAudit {
  id: string;
  creationDate: Date;
  closeDate: Date;
  articlesWithoutAudit: Article[];
  articlesLosses: ArticleLoss[];
  lossValue: number;
}
