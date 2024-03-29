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
import { MessengerComponent } from './messenger/messenger.component';
import {TagsComponent} from "./tags/tags.component";
import {CustomerDiscountComponent} from "./customer-discount/customer-discount.component";
import {AdvertisingComponent} from "./Advertising/advertising.component";
import {VouchersComponent} from './vouchers/vouchers.component';
import {BudgetsComponent} from "./budgets/budgets.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {CreditLineComponent} from "./credit-line/credit-line.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import {StaffComponent} from './staff/staff.component';
import {StockAuditComponent} from './stock-audit/stock-audit.component';
import {RefundsComponent} from "./refunds/refunds.component";
import {OrdersComponent} from "./orders/orders.component";
import {StockAlarmComponent} from "./stock-alarm/stock-alarm.component";
import {CashierClosureComponent} from "./cashier-closure/cashier-closure.component";
import {OffersComponent} from "./offers/offers.component";
import {IssueComponent} from "./issues/issues.component";
import {TechnicalSupportComponent} from "../home/technical-support/technical-support.component";
import {ChatWindowComponent} from "../home/technical-support/chat-window.component";
import {ComplaintsComponent} from '../home/complaints/complaints.component';
import {DataProtectionComponent} from "./data-protection/data-protection.component";

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
      {path: 'cashier-closure', component: CashierClosureComponent},
      {path: 'complaints', component: ComplaintsComponent },
      {path: 'providers', component: ProvidersComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'salesPeople', component: SalesPeopleComponent},
      {path: 'messenger', component: MessengerComponent},
      {path: 'tags', component: TagsComponent},
      {path: 'customer-discount', component: CustomerDiscountComponent},
      {path: 'advertising',component:AdvertisingComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'vouchers', component: VouchersComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'credit-line', component: CreditLineComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'online-orders', component: OnlineOrdersComponent},
      {path: 'stock-audit', component: StockAuditComponent},
      {path: 'stock-alarm', component: StockAlarmComponent},
      {path: 'refunds', component: RefundsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'users', component: StaffComponent},
      {path: 'offers', component: OffersComponent},
      {path: 'issues', component: IssueComponent},
      {
        path: 'technical-support',
        component: TechnicalSupportComponent,
        data: {roles: [Role.OPERATOR]}
      },
      {
        path: 'chat/:id',
        component: ChatWindowComponent
      },
      {path: 'data-protection', component: DataProtectionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
