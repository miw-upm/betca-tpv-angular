import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';
import {Observable} from "rxjs";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {CustomerPointsService} from "./customer-points/customer-points.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  title = 'TPV';
  username = undefined;
  customerPoints: Observable<CustomerPoints>;
  constructor(private dialog: MatDialog, private authService: AuthService, private customerPointsService: CustomerPointsService) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.username = this.authService.getName();
        this.customerPoints = this.customerPointsService.getCurrentCustomerPoints();
      });
  }

  logout(): void {
    this.authService.logout();
  }

  cart(): void {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  search(value): void {
  }

}
