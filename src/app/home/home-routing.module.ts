import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {AdviserComponent} from './adviser/adviser.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'adviser', component: AdviserComponent}, // public
      {path: 'complaints', component: ComplaintsComponent, canActivate: [RoleGuardService], data: {roles: [Role.CUSTOMER]}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
