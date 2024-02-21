import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {ComplaintsComponent} from './complaints/complaints.component';
import {HomeComponent} from './home.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {AdviserNewComponent} from "./adviser/adviser-new/adviser-new.component";
import {AdviserPopularComponent} from "./adviser/adviser-popular/adviser-popular.component";
import {Top5Component} from "./adviser/top5/top5.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'adviser/new',
        component: AdviserNewComponent,
      },
      {
        path: 'adviser/popular',
        component: AdviserPopularComponent,
      },
      {
        path: 'top5',
        component: Top5Component,
      }, // public
      {
        path: 'complaints',
        component: ComplaintsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {path: 'shopping-basket', component: ShoppingBasketComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
