import { Article } from "../../shop/shared/services/models/article.model";

export interface Tag {
  name: string;
  group: string;
  description: string;
  articles: Article[];
}
