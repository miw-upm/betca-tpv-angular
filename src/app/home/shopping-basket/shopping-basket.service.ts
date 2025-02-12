import {Injectable} from '@angular/core';
import {Article} from "../../shop/shared/services/models/article.model";

@Injectable({providedIn: 'root'})
export class ShoppingBasketService {

    constructor() {
    }

    addArticle(article: Article): void {
        console.log('Article added to shopping basket: ' + article.description);
    }
}
