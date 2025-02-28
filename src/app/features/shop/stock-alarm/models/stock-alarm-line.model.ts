import {Article} from "../../../shared/models/article.model";

export interface StockAlarmLine {
    article: Article;
    warning: number;
    critical: number;
}