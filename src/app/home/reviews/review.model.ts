import {Article} from "../shared/article.model";
import {User} from "@core/user.model";

export interface Review {
  user: User;
  article: Article;
  stars: number;
  opinion: string;
}
