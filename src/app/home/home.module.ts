import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ShoppingBasketService} from './shopping-basket/shopping-basket.service';
import {ComplaintCreationDialogComponent} from './complaints/complaint-creation-dialog.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {ShopModule} from "../shop/shop.module";
import {CarouselModule} from "@shared/components/carousel/carousel.module";
import { AdviserNewComponent } from './adviser/adviser-new/adviser-new.component';
import { AdviserPopularComponent } from './adviser/adviser-popular/adviser-popular.component';
import { Top5Component } from './adviser/top5/top5.component';
import {SearchByDescriptionComponent} from "./shared/search-by-description.component";
import {PhoneRequestDialogComponent} from "./shopping-basket/phone-request-dialog.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import { RefundsComponent } from './refunds/refunds.component';

@NgModule({
  declarations: [
    SearchByDescriptionComponent,
    ComplaintsComponent,
    PhoneRequestDialogComponent,
    ComplaintCreationDialogComponent,
    HomeComponent,
    OnlineOrdersComponent,
    ShoppingBasketComponent,
    AdviserNewComponent,
    AdviserPopularComponent,
    Top5Component,
    RefundsComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    ShopModule,
    CarouselModule,
  ],
  providers: [
    ShoppingBasketService,
  ]
})
export class HomeModule {

}
