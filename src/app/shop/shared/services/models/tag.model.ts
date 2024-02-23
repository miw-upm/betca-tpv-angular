import { Article } from './article.model';

export interface Tag {
  name: string;
  group: string;
  description: string;
  articles: Article[];
}
