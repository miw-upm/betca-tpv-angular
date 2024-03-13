import {Injectable} from '@angular/core';

import {Article} from '../shared/article.model';
import {HttpService} from "@core/http.service";
import {TicketService} from "../../shop/cashier-opened/tickets/tickets.service";
import {OnlineOrdersService} from "@shared/services/online-orders.service";
import {AuthService} from "@core/auth.service";
import {EndPoints} from "@shared/end-points";
import {Observable} from "rxjs";
import {OnlineOrder} from "@shared/models/online-order.model";
import {Shopping} from "@shared/models/shopping.model";
import {TicketCreation} from "@shared/models/ticket-creation.model";
import {User} from "@shared/models/user.models";


@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {
  shoppingBasket: Shopping[] = [];

  constructor(private httpService: HttpService, private authService: AuthService) {
  }

  createTicket(shoppings: Shopping[]) {
    let ticketCreation : TicketCreation = {user: <User>{mobile:Number(this.authService.getMobile())},
    shoppingList: shoppings, cash: 0, card: 0, note: "Online", voucher: 0};
    return this.httpService
      .post(EndPoints.TICKETS + "/online", ticketCreation);
  }

  createOrder(onlineOrder: OnlineOrder) {
    return this.httpService
      .post(EndPoints.ONLINE_ORDERS, onlineOrder);
  }

  addArticle(article: Article): void {
    this.shoppingBasket.push(new Shopping(article.barcode, article.description, article.retailPrice));
  }

  loadShoppingBasketContent() {
    return this.shoppingBasket;
  }

  saveShoppingBasketContent(shoppings: Shopping[]) {
    this.shoppingBasket = shoppings;
  }

  shoppingBasketCount(): number {
    return this.shoppingBasket.length;
  }

  printTicket(ticketId: string): Observable<void> {
    console.log(ticketId);
    return this.httpService.pdf().get(EndPoints.TICKETS + '/' + ticketId + "/receipt/online");
  }
}
