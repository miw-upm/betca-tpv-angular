import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {map} from 'rxjs/operators';

import {AuthService} from '@core/services/auth.service';
import {HttpService} from '@core/services/http.service';
import {SharedCashierService} from './shared/services/shared.cashier.service';
import {DateComponent} from '../../common/components/date.component';
import {FooterComponent} from '../../common/components/footer.component';
import {CashierDialogComponent} from './cashier-opened/cashier-closure/cashier-dialog.component';

@Component({
    standalone: true,
    imports: [MatToolbar, DateComponent, MatIcon, MatMenuTrigger, MatButton, NgOptimizedImage, MatIconButton,
        MatMenu, MatMenuItem, RouterLink, NgIf, RouterOutlet, FooterComponent],
    templateUrl: 'shop.component.html',
    styleUrls: ['shop.component.css']
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
