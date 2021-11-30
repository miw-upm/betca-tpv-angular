import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EMPTY, iif, merge, Observable} from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators';

import {HttpService} from '@core/http.service';
import {SharedArticleService} from '../../shared/services/shared.article.service';
import {Shopping} from './shopping.model';
import {TicketCreation} from './ticket-creation.model';
import {ArticleQuickCreationDialogComponent} from './article-quick-creation-dialog.component';

import {ShoppingState} from './shopping-state.model';
import {EndPoints} from '@shared/end-points';

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

  createTicketAndPrintReceipts(ticketCreation: TicketCreation, voucher: number, requestedInvoice: boolean, requestedGiftTicket: boolean,
                               requestDataProtectionAct: boolean): Observable<void> {
    return this.httpService
      .post(EndPoints.TICKETS, ticketCreation)
      .pipe(
        concatMap(ticket => {
          let receipts = this.printTicket(ticket.id);
          receipts = iif(() => voucher > 0, merge(receipts, this.createVoucherAndPrint(voucher)), receipts);
          receipts = iif(() => requestedInvoice, merge(receipts, this.createInvoiceAndPrint(ticket.id)), receipts);
          receipts = iif(() => requestedGiftTicket, merge(receipts, this.createGiftTicketAndPrint(ticket.id)), receipts);
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

  createGiftTicketAndPrint(ticketId: string): Observable<void> {
    return EMPTY; // TODO change EMPTY
  }

  createDataProtectionActAndPrint(ticket): Observable<void> {
    return EMPTY; // TODO change EMPTY
  }
}
