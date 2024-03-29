import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {AdviserComponent} from './adviser/adviser.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ReviewsComponent} from "./reviews/reviews.component";
import {HomeComponent} from './home.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {Top5Component} from "./adviser/top5/top5.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import {RefundsComponent} from "./refunds/refunds.component";
import {SettingsComponent} from "./settings/settings.component";
import {TicketTrackingComponent} from "./ticket-tracking/ticket-tracking.component";
import {TechnicalSupportComponent} from "./technical-support/technical-support.component";
import {ChatWindowComponent} from "./technical-support/chat-window.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'adviser', component: AdviserComponent},
      {path: 'top5', component: Top5Component},
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'complaints',
        component: ComplaintsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER, Role.MANAGER, Role.ADMIN]}
      },
      {
        path: 'shopping-basket',
        component: ShoppingBasketComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
      {
        path: 'online-orders',
        component: OnlineOrdersComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'refunds',
        component: RefundsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'ticket-tracking/:id',
        component: TicketTrackingComponent
      },
      {
        path: 'technical-support',
        component: TechnicalSupportComponent,
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'chat/:id',
        component: ChatWindowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
