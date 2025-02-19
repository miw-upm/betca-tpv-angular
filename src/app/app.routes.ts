import { Routes } from "@angular/router";

import { RoleGuardService } from "@core/services/role-guard.service";
import { Role } from "@core/models/role.model";
import { AdviserComponent } from "./features/home/adviser/adviser.component";
import { ArticlesComponent } from "./features/shop/articles/articles.component";
import { CashierClosedComponent } from "./features/shop/cashier-closed/cashier-closed.component";
import { CashierOpenedComponent } from "./features/shop/cashier-opened/cashier-opened.component";
import { ComplaintsComponent } from "./features/home/complaints/complaints.component";
import { HomeComponent } from "./features/home/home.component";
import { ProvidersComponent } from "./features/shop/providers/providers.component";
import { ShopComponent } from "./features/shop/shop.component";
import { TicketsComponent } from "./features/shop/cashier-opened/tickets/tickets.component";
import { OffersComponent } from "./features/shop/offers/offers.component";
import { BudgetsComponent } from "./features/shop/budgets/budgets.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home/adviser" },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "adviser", component: AdviserComponent }, // PUBLIC
      {
        path: "complaints",
        component: ComplaintsComponent,
        canActivate: [RoleGuardService],
        data: { roles: [Role.CUSTOMER] },
      },
    ],
  },
  {
    path: "shop",
    component: ShopComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Role.ADMIN, Role.MANAGER, Role.OPERATOR] },
    children: [
      // or path: 'shop/articles'
      { path: "articles", component: ArticlesComponent },
      { path: "offers", component: OffersComponent },
      { path: "cashier-closed", component: CashierClosedComponent },
      { path: "cashier-opened", component: CashierOpenedComponent },
      { path: "providers", component: ProvidersComponent },
      { path: "tickets", component: TicketsComponent },
      { path: "budgets", component: BudgetsComponent },
    ],
  },
];
