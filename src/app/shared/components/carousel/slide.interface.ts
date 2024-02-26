import {Article} from "../../../home/shared/article.model";

export interface SlideInterface {
  description: string;
  strip: string | null; //Banda de lateral para poner "NEW" o cosas así. Si es null no aparece.
  url: string | null; //Url para redirigir al producto o añadir al carrito etc. Si es null no aparece,
  article: Article
}
