import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home/adviser'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)}, // lazy load
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(module => module.ShopModule)} // lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
