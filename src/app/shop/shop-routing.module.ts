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
import {QuarterVatComponent} from "./quarter-vat/quarter-vat.component";
import { MessengerComponent } from './messenger/messenger.component';
import {TagsComponent} from "./tags/tags.component";
import {CustomerDiscountComponent} from "./customer-discount/customer-discount.component";

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
      {path: 'messenger', component: MessengerComponent},
      {path: 'quarter-vat', component: QuarterVatComponent},
      {path: 'tags', component: TagsComponent},
      {path: 'customer-discount', component: CustomerDiscountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
