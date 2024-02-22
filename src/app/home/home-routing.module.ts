import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {AdviserComponent} from './adviser/adviser.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {HomeComponent} from './home.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {Top5Component} from "./adviser/top5/top5.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'adviser', component: AdviserComponent},
      {path: 'top5', component: Top5Component},
      {
        path: 'complaints',
        component: ComplaintsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'shopping-basket',
        component: ShoppingBasketComponent
      },
      {
        path: 'online-orders',
        component: OnlineOrdersComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
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
