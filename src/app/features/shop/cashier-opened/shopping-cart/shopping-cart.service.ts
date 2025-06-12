import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EMPTY, iif, merge, Observable} from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {SharedShopArticleService} from '../../shared/services/shared-shop.article.service';
import {ArticleQuickCreationDialogComponent} from './article-quick-creation-dialog.component';
import {Shopping} from './shopping.model';
import {TicketCreation} from './ticket-creation.model';
import {ShoppingState} from './shopping-state.model';
import { CustomerPointsConstants } from './customer-points/customer-points.model';
import {Offer} from "../../shared/models/offer.model";
import {Tickets} from "../tickets/models/tickets.model";
import {AuthService} from "@core/services/auth.service";
import { HttpClient} from '@angular/common/http';
import { InvoiceService } from '../../invoices/services/invoice.service';
import { Invoice } from '../../invoices/models/invoice.model';
import { CustomerDiscountDto } from '../../customer-discount/models/customer-discount.model';

@Injectable({providedIn: 'root'})
export class ShoppingCartService {
    static readonly RECEIPT = '/receipt';
    static readonly VARIOUS_BARCODE = '1';
    static readonly VARIOUS_LENGTH = 5;

    constructor(private readonly dialog: MatDialog, private readonly articleShopService: SharedShopArticleService, private readonly httpService: HttpService,
                private readonly http: HttpClient, private readonly authService: AuthService, private readonly invoiceService: InvoiceService) {
    }

    read(newBarcode: string): Observable<Shopping> {
        const price: number = Number(newBarcode.replace(',', '.'));
        if (!Number.isNaN(price) && newBarcode.length <= ShoppingCartService.VARIOUS_LENGTH) {
            newBarcode = ShoppingCartService.VARIOUS_BARCODE;
        }
        return this.articleShopService
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

    createTicketAndPrintReceipts(ticketCreation: TicketCreation, voucher: number, requestedInvoice: boolean, requestedGiftTicket: boolean, requestDataProtectionAct: boolean, useCustomerPoints: boolean, createInvoice?: boolean): Observable<void> {
        return this.httpService
            .post(EndPoints.TICKETS, ticketCreation)
            .pipe(
                concatMap(ticket => {
                    let receipts = this.printTicket(ticket.id);
                    console.log("Ticket ID: ", ticket.id);
                    console.log("Ticket Creation: ", ticket);
                    if (createInvoice){
                       const invoice = {
                            identity: undefined,
                            creationDate: new Date(),
                            baseTax: 0,
                            taxValue: 0,
                            user: this.authService.getUser(),
                            ticket: undefined
                            }
                        invoice.ticket = {
                            card: "", cash: "", class: "", creationDate: undefined, id: ticket.id, note: "",
                            reference: "", shoppingList: undefined, userMobile: "", voucher: ""
                        };
                        invoice.user.mobile =  ticket.user.mobile;
                         receipts = iif(() => requestedInvoice, merge(receipts, this.createInvoiceAndPrint(invoice)), receipts);
                    }
                    receipts = iif(() => voucher > 0, merge(receipts, this.createVoucherAndPrint(voucher)), receipts);
                    receipts = iif(() => requestedGiftTicket, merge(receipts, this.createGiftTicketAndPrint(ticket.id, ticketCreation.messageGift)), receipts);
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

    createInvoiceAndPrint(invoice: Invoice): Observable<void> {
        return this.httpService
            .post(EndPoints.INVOICES, {ticket: invoice.ticket.id, mobile: invoice.user.mobile})
            .pipe(concatMap(invoiceReceipt => {
                return this.httpService.pdf().get(EndPoints.INVOICES + '/' + invoiceReceipt.identity + ShoppingCartService.RECEIPT);}))
    }

    createGiftTicketAndPrint(ticketId: number, message: string): Observable<void> {
        localStorage.setItem('tokenGuardar', this.authService.getToken());
        return this.httpService
            .post(EndPoints.GIFTTICKETS, { id: ticketId, message: message })
            .pipe(
                concatMap(giftTicket => {
                    let receipts = new Observable<void>();
                    receipts = merge(
                        receipts,
                        this.httpService.pdf().get(EndPoints.GIFTTICKETS + '/' + giftTicket.reference + '/' + 'receipt')
                    );
                    return receipts;
                })
            );
    }

    createDataProtectionActAndPrint(ticket): Observable<void> {
        alert('Data protection act creation not implemented');
        return EMPTY; // TODO change EMPTY
    }

    readOffer(reference: string): Observable<Offer> {
        return this.httpService
            .successful("Offer applied.")
            .error("Offer not found.")
            .get(EndPoints.OFFERS + '/' + reference);
    }

    readDiscount(mobile: number):Observable<CustomerDiscountDto>{
        return this.httpService.get(`${EndPoints.CUSTOMER_DISCOUNT}/${mobile}`);
    }
}