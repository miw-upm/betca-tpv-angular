import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { HttpService } from '@core/http.service';
import { AuthService } from '@core/auth.service';
import { SharedCashierService } from './shared/services/shared.cashier.service';
import { CashierDialogComponent } from './cashier-opened/cashier-closure/cashier-dialog.component';
import { SharedMessengerService } from './shared/services/shared-messager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SlackSentMessageDialogComponent
} from "./slack-messages/slack-sent-message-dialog/slack-sent-message-dialog.component";
import {QuarterVatDialogComponent} from "./quarter-vat/quarter-vat-dialog.component";
@Component({
  templateUrl: 'shop.component.html',
  styleUrls: ['shop.component.css'],

})
export class ShopComponent implements OnInit {
  username: string;
  cashierClosed: boolean;

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService,
    private tokensService: AuthService, private sharedCashierService: SharedCashierService,
    private matSnackBar: MatSnackBar, private shareMessegerService: SharedMessengerService) {
    this.username = tokensService.getName();
    this.cashierClosed = true;
    this.cashier();
  }
  ngOnInit(): void {
    this.checkNewMessageDialog();
  }

  untilManager(): boolean {
    return this.tokensService.untilManager();
  }

  cashier(): void {
    this.sharedCashierService.readLast()
      .pipe(
        map(cashier => cashier.closed)
      )
      .subscribe(
        closed => {
          this.cashierClosed = closed;
          if (closed) {
            this.router.navigate(['shop', 'cashier-closed']).then();
          } else {
            this.router.navigate(['shop', 'cashier-opened']).then();
          }
        }
      );
  }

  logout(): void {
    this.tokensService.logout();
  }

  openCashier(): void {
    this.sharedCashierService
      .openCashier()
      .subscribe(() => this.cashier());
  }

  closeCashier(): void {
    this.dialog
      .open(CashierDialogComponent)
      .afterClosed()
      .subscribe(() => this.cashier());
  }

  checkNewMessageDialog() {
    this.shareMessegerService.countNewMessage().subscribe((result: number) => {
      if (result>0) {
          this.matSnackBar.open("You have " + result + " new messages", "Okey", {
            duration: 10000,
          });
      }

    });
  }

  showSlackDialog(){
    this.dialog.open(SlackSentMessageDialogComponent);
  }

  showQuarterVATDialog() {
    this.dialog.open(QuarterVatDialogComponent);
  }
}
