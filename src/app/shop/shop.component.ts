import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {HttpService} from '@core/services/http.service';
import {AuthService} from '@core/services/auth.service';
import {SharedCashierService} from './shared/services/shared.cashier.service';
import {CashierDialogComponent} from './cashier-opened/cashier-closure/cashier-dialog.component';
import {MatToolbar} from '@angular/material/toolbar';
import {DateComponent} from '@shared/components/date.component';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FooterComponent} from '@shared/components/footer.component';

@Component({
    standalone: true,
    templateUrl: 'shop.component.html',
    styleUrls: ['shop.component.css'],

    imports: [
        MatToolbar,
        DateComponent,
        MatIcon,
        MatMenuTrigger,
        MatButton,
        NgOptimizedImage,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        RouterLink,
        NgIf,
        RouterOutlet,
        FooterComponent
    ]
})
export class ShopComponent {
    username: string;
    cashierClosed: boolean;

    constructor(private readonly router: Router, private readonly dialog: MatDialog, private readonly httpService: HttpService,
                private readonly tokensService: AuthService, private readonly sharedCashierService: SharedCashierService) {
        this.username = tokensService.getName();
        this.cashierClosed = true;
        this.cashier();
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


}
