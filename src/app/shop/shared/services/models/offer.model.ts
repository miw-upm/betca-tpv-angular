import { Article } from "./article.model";

export interface Offer {
  reference:String;
  description:String;
  creationDate:Date;
  expiryDate:Date;
  discount:number;
  articles: Article[];
}
