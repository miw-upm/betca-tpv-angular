import { Article} from "../../home/shared/article.model";

export interface Tag {
  name: string;
  group: string;
  description: string;
  articles: Article[];
}
