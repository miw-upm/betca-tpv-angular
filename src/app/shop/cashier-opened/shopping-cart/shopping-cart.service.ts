import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EMPTY, iif, merge, mergeMap, Observable, of} from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {SharedArticleService} from '../../shared/services/shared.article.service';
import {TicketCreation} from '@shared/models/ticket-creation.model';
import {ArticleQuickCreationDialogComponent} from './article-quick-creation-dialog.component';

import {ShoppingState} from './shopping-state.model';
import {EndPoints} from '@shared/end-points';
import { GiftTicketCreation } from './gift-ticket-creation.model';
import {Salesperson} from "../../shared/services/models/salesPeople.model";
import {Shopping} from "@shared/models/shopping.model";

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  static RECEIPT = '/receipt';
  static VARIOUS_BARCODE = '1';
  static VARIOUS_LENGTH = 5;

  constructor(private dialog: MatDialog, private articleService: SharedArticleService, private httpService: HttpService) {
  }

  read(newBarcode: string): Observable<Shopping> {
    const price: number = Number(newBarcode.replace(',', '.'));
    if (!Number.isNaN(price) && newBarcode.length <= ShoppingCartService.VARIOUS_LENGTH) {
      newBarcode = ShoppingCartService.VARIOUS_BARCODE;
    }
    return this.articleService
      .read(newBarcode)
      .pipe(
        map(article => {
          if (newBarcode === ShoppingCartService.VARIOUS_BARCODE) {
            article.retailPrice = price;
          }
          return article;
        }),
        catchError(() => {
          return this.dialog
            .open(ArticleQuickCreationDialogComponent, {data: {barcode: newBarcode}})
            .afterClosed();
        })
      ).pipe(
        map(article => {
            const shopping = new Shopping(article.barcode, article.description, article.retailPrice);
            if (article.stock < 1) {
              shopping.state = ShoppingState.NOT_COMMITTED;
            }
            return shopping;
          }
        )
      );
  }

  createTicketAndPrintReceipts(ticketCreation: TicketCreation, giftTicketCreation: GiftTicketCreation, voucher: number, requestedInvoice: boolean, requestedGiftTicket: boolean,
                               requestDataProtectionAct: boolean,  salesPerson: Salesperson): Observable<void> {
    return this.httpService
      .post(EndPoints.TICKETS, ticketCreation)
      .pipe(
        concatMap(ticket => {
          salesPerson.ticket = ticket;
          this.createSalesPeople(salesPerson);
          let receipts = this.printTicket(ticket.id);
          receipts = iif(() => voucher > 0, merge(receipts, this.createVoucherAndPrint(voucher)), receipts);
          receipts = iif(() => requestedInvoice, merge(receipts, this.createInvoiceAndPrint(ticket.id)), receipts);
          receipts = iif(() => requestedGiftTicket, merge(receipts, this.createGiftTicketAndPrint(ticket.id, giftTicketCreation)), receipts);
          receipts = iif(() => requestDataProtectionAct, merge(receipts, this.createDataProtectionActAndPrint(ticket)), receipts);
          return receipts;
        })// ,switchMap(() => EMPTY)
      );
  }

  printTicket(ticketId: string): Observable<void> {
    return this.httpService.pdf().get(EndPoints.TICKETS + '/' + ticketId + ShoppingCartService.RECEIPT);
  }

  createVoucherAndPrint(voucher: number): Observable<void> {
    return EMPTY; // TODO change EMPTY
  }

  createInvoiceAndPrint(ticketId: string): Observable<void> {
    return EMPTY; // TODO change EMPTY
  }

  createGiftTicketAndPrint(ticketId: string, giftTicketCreation: GiftTicketCreation): Observable<void> {
    return this.httpService.post(EndPoints.GIFT_TICKETS, {ticketId: ticketId, message: giftTicketCreation.message})
      .pipe(
        concatMap(giftTicket => {
          const receipt = this.httpService.pdf().get(EndPoints.GIFT_TICKETS + '/' + giftTicket.id + ShoppingCartService.RECEIPT)
          return receipt;
        })
      );
  }

  createDataProtectionActAndPrint(ticket): Observable<void> {
    alert('Data protection act creation not implemented');
    return EMPTY; // TODO change EMPTY
  }
  getPointsDiscountShoppingForUser(mobileNumber: string, totalShoppingCart: number): Observable<Shopping> {
    return this.articleService.getPointsDiscountArticleForUser(mobileNumber, totalShoppingCart)
      .pipe(
        map(article=>new Shopping(article.barcode,article.description,article.retailPrice))
      );
  }

  createSalesPeople(salesPerson: Salesperson): Observable<Salesperson> {
    return this.httpService
      .post(EndPoints.SALESPEOPLE, salesPerson);
  }
}
