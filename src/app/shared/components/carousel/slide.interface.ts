import { Article} from "../../../shop/shared/services/models/article.model";

export interface SlideInterface {
  description: string;
  strip: string | null;
  url: string | null;
  article: Article
}
