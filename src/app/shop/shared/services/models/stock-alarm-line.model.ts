import { Article } from "./article.model";

export class StockAlarmLine {
  article: Article;
  warning:number;
  critical:number;
}
