import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {MatInput} from '@angular/material/input';

import {AuthService} from "@core/services/auth.service";
import {FooterComponent} from '../../common/components/footer.component';
import {LoginDialogComponent} from "../../common/dialogs/login-dialog.component";

@Component({
    standalone: true,
    imports: [CommonModule, FooterComponent, MatToolbar, MatFormField, MatIcon, MatButton, RouterLink, MatMenuTrigger,
        MatBadge, MatMenu, MatMenuItem, MatInput, MatIconButton, NgOptimizedImage, MatLabel, RouterOutlet],
    selector: 'app-home',
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
