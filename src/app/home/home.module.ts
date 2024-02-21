import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ShoppingBasketService} from './shopping-basket/shopping-basket.service';
import {ComplaintCreationDialogComponent} from './complaints/complaint-creation-dialog.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {AdviserComponent} from './adviser/adviser.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {ShopModule} from "../shop/shop.module";
import {CarouselModule} from "@shared/components/carousel/carousel.module";
import {SearchByDescriptionComponent} from "./shared/search-by-description.component";
import {PhoneRequestDialogComponent} from "./shopping-basket/phone-request-dialog.component";

@NgModule({
  declarations: [
    SearchByDescriptionComponent,
    AdviserComponent,
    ComplaintsComponent,
    PhoneRequestDialogComponent,
    ComplaintCreationDialogComponent,
    HomeComponent,
    ShoppingBasketComponent
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
