import {Routes} from '@angular/router';

import {RoleGuardService} from '@core/services/role-guard.service';
import {Role} from '@core/models/role.model';
import {AdviserComponent} from './home/adviser/adviser.component';
import {ArticlesComponent} from './shop/articles/articles.component';
import {CashierClosedComponent} from './shop/cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './shop/cashier-opened/cashier-opened.component';
import {ComplaintsComponent} from './home/complaints/complaints.component';
import {HomeComponent} from "./home/home.component";
import {ProvidersComponent} from './shop/providers/providers.component';
import {ShopComponent} from "./shop/shop.component";
import {TicketsComponent} from './shop/cashier-opened/tickets/tickets.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home/adviser'},
    {
        path: 'home', component: HomeComponent,
        children: [
            {path: 'adviser', component: AdviserComponent}, // PUBLIC
            {
                path: 'complaints',
                component: ComplaintsComponent,
                canActivate: [RoleGuardService],
                data: {roles: [Role.CUSTOMER]}
            }
        ]
    },
    {
        path: 'shop', component: ShopComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.ADMIN, Role.MANAGER, Role.OPERATOR]},
        children: [ // or path: 'shop/articles'
            {path: 'articles', component: ArticlesComponent},
            {path: 'cashier-closed', component: CashierClosedComponent},
            {path: 'cashier-opened', component: CashierOpenedComponent},
            {path: 'providers', component: ProvidersComponent},
            {path: 'tickets', component: TicketsComponent},
        ]
    }
];
