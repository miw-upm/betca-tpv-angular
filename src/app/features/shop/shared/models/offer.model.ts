
import {Article} from "../../../shared/models/article.model";

export interface Offer {
    reference?: string;
    description: string;
    creationDate: Date;
    expiryDate: Date;
    discount: number;
    articleList: Article[];
}