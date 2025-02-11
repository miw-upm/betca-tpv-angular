import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FooterComponent} from '@shared/components/footer.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatFormField,MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {MatInput} from '@angular/material/input';
import {AuthService} from "@core/auth.service";
import {LoginDialogComponent} from "@shared/dialogs/login-dialog.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, MatToolbar, MatFormField, MatIcon, MatButton,
    RouterLink, MatMenuTrigger, MatBadge, MatMenu, MatMenuItem, MatInput, MatIconButton,
    NgOptimizedImage, MatLabel, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'TPV';
  username = undefined;
  cartItemCount: number = 3;

  constructor(private readonly dialog: MatDialog, private readonly authService: AuthService) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
        .afterClosed()
        .subscribe(() => this.username = this.authService.getName());
  }

  logout(): void {
    this.authService.logout();
  }

  cart(): void {
    //TODO
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  search(value): void {
    //TODO
  }

}
