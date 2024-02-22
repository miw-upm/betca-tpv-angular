import {ArticleLoss} from "./articleLoss.model";
import {Article} from "./article.model";

export class StockAudit {
  creationDate: Date;
  closeDate: Date;
  articlesWithoutAudit: Article[];
  lossValue: number;
  losses: ArticleLoss[];
}
