import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {ArticlesComponent} from './articles/articles.component';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened.component';
import {ProvidersComponent} from './providers/providers.component';
import {ShopComponent} from './shop.component';
import {TicketsComponent} from './cashier-opened/tickets/tickets.component';
import {SalesPeopleComponent} from './sales-people/sales-people.component';
import {QuarterVatComponent} from "./quarter-vat/quarter-vat.component";
import { MessengerComponent } from './messenger/messenger.component';
import {TagsComponent} from "./tags/tags.component";
import {VouchersComponent} from './vouchers/vouchers.component';
import {BudgetsComponent} from "./budgets/budgets.component";
import {CreditLineComponent} from "./credit-line/credit-line.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import {StockAuditComponent} from './stock-audit/stock-audit.component';

const routes: Routes = [
  {
    path: '', // 'shop' to forRoot
    component: ShopComponent,
    canActivate: [RoleGuardService],
    data: {roles: [Role.ADMIN, Role.MANAGER, Role.OPERATOR]},
    children: [ // or path: 'shop/articles'
      {path: 'articles', component: ArticlesComponent},
      {path: 'cashier-closed', component: CashierClosedComponent},
      {path: 'cashier-opened', component: CashierOpenedComponent},
      {path: 'providers', component: ProvidersComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'salesPeople', component: SalesPeopleComponent},
      {path: 'messenger', component: MessengerComponent},
      {path: 'quarter-vat', component: QuarterVatComponent},
      {path: 'tags', component: TagsComponent},
      {path: 'vouchers', component: VouchersComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'credit-line', component: CreditLineComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'online-orders', component: OnlineOrdersComponent},
      {path: 'stock-audit', component: StockAuditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
