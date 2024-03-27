import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';
import {Observable} from "rxjs";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {CustomerPointsService} from "./customer-points/customer-points.service";
import {ShoppingBasketService} from "./shopping-basket/shopping-basket.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  title = 'TPV';
  username = undefined;

  constructor(private dialog: MatDialog, private authService: AuthService
              , private customerPointsService: CustomerPointsService, private shoppingBasketService: ShoppingBasketService) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.username = this.authService.getName();
      });
  }

  logout(): void {
    this.authService.logout();
  }

  cart(): number {
    return this.shoppingBasketService.shoppingBasketCount();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  search(value): void {
  }

}
