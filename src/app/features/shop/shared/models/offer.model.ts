
import {Article} from "./article.model";

export interface Offer {
    reference: string;
    description: string;
    creationDate: Date;
    expiryDate: Date;
    discount: number;
    articles: Article[];
}