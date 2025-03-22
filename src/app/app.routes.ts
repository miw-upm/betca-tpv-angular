import { Routes } from '@angular/router';

import { Role } from '@core/models/role.model';
import { RoleGuardService } from '@core/services/role-guard.service';
import { AdviserComponent } from './features/home/adviser/adviser.component';
import { ComplaintsHomeComponent } from './features/home/complaints-home/complaints-home.component';
import { HomeComponent } from './features/home/home.component';
import { OfferDetailsComponent } from "./features/home/offers/offer-details.component";
import { ReviewsComponent } from './features/home/reviews/reviews.component';
import { ArticlesComponent } from './features/shop/articles/articles.component';
import { BudgetsComponent } from './features/shop/budgets/budgets.component';
import { CashierClosedComponent } from './features/shop/cashier-closed/cashier-closed.component';
import { CashierClosureHistoryComponent } from './features/shop/cashier-opened/cashier-closure-history/cashier-closure-history.component';
import { CashierOpenedComponent } from './features/shop/cashier-opened/cashier-opened.component';
import { TicketsComponent } from './features/shop/cashier-opened/tickets/tickets.component';
import { ComplaintsShopComponent } from './features/shop/complaints-shop/complaints-shop.component';
import { DataProtectionComponent } from './features/shop/data-protection/data-protection.component';
import { InvoicesComponent } from './features/shop/invoices/invoices.component';
import { OffersComponent } from './features/shop/offers/offers.component';
import { OrdersComponent } from './features/shop/orders/orders.component';
import { ProvidersComponent } from './features/shop/providers/providers.component';
import { ShopComponent } from './features/shop/shop.component';
import { SlackPublishComponent } from './features/shop/slack-publish/slack-publish.component';
import { StockAlarmComponent } from "./features/shop/stock-alarm/stock-alarm.component";
import { StockAuditViewComponent } from './features/shop/stock-audit/components/stock-audit-view/stock-audit-view.component';
import { StockAuditComponent } from './features/shop/stock-audit/stock-audit.component';
import { VouchersComponent } from './features/shop/vouchers/vouchers.component';
import { CustomerDiscountComponent } from "./features/shop/customer-discount/customer-discount.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home/adviser' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'adviser', component: AdviserComponent }, // PUBLIC
            { path: 'offers/:reference', component: OfferDetailsComponent },
            {
                path: 'complaints',
                component: ComplaintsHomeComponent,
                canActivate: [RoleGuardService],
                data: { roles: [Role.CUSTOMER] },
            },
            {
                path: 'reviews',
                component: ReviewsComponent,
                canActivate: [RoleGuardService],
                data: { roles: [Role.CUSTOMER] },
            },
        ],
    },
    {
        path: 'shop',
        component: ShopComponent,
        canActivate: [RoleGuardService],
        data: { roles: [Role.ADMIN, Role.MANAGER, Role.OPERATOR] },
        children: [
            // or path: 'shop/articles'
            { path: 'articles', component: ArticlesComponent },
            { path: 'offers', component: OffersComponent },
            { path: 'cashier-closed', component: CashierClosedComponent },
            { path: 'cashier-opened', component: CashierOpenedComponent },
            { path: 'providers', component: ProvidersComponent },
            { path: 'tickets', component: TicketsComponent },
            { path: 'budgets', component: BudgetsComponent },
            { path: 'invoices', component: InvoicesComponent },
            { path: 'data-protection', component: DataProtectionComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'vouchers', component: VouchersComponent },
            { path: 'cashier-closure-history', component: CashierClosureHistoryComponent },
            { path: 'slack-publish', component: SlackPublishComponent },
            { path: 'complaints', component: ComplaintsShopComponent },
            { path: 'stock-alarm', component: StockAlarmComponent },
            { path: 'customer-discount', component: CustomerDiscountComponent },
            {
                path: 'stock-audit',
                children: [
                    { path: '', component: StockAuditComponent },
                    { path: 'view/:id', component: StockAuditViewComponent, }
                ]
            }
        ]
    }
];
