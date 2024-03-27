import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ShoppingBasketService} from './shopping-basket/shopping-basket.service';
import {ComplaintCreationDialogComponent} from './complaints/complaint-creation-dialog.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";
import {ShopModule} from "../shop/shop.module";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ReviewDialogComponent} from "./reviews/review-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "@shared/components/carousel/carousel.module";
import {AdviserComponent} from "./adviser/adviser.component";
import { Top5Component } from './adviser/top5/top5.component';
import {SearchByDescriptionComponent} from "./shared/search-by-description.component";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import { RefundsComponent } from './refunds/refunds.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsSavedInfoDialogComponent } from './settings/settings-saved-info-dialog/settings-saved-info-dialog.component';
import {CustomerPointsService} from "./customer-points/customer-points.service";
import { TicketTrackingComponent } from './ticket-tracking/ticket-tracking.component';
import { ProductComponent } from './ticket-tracking/product/product.component';
import {TechnicalSupportComponent} from "./technical-support/technical-support.component";
import {ChatWindowComponent} from "./technical-support/chat-window.component";
import {OnlineOrdersService} from "./online-orders/online-orders.service";


@NgModule({
  declarations: [
    AdviserComponent,
    SearchByDescriptionComponent,
    ComplaintsComponent,
    ComplaintCreationDialogComponent,
    ReviewsComponent,
    ReviewDialogComponent,
    HomeComponent,
    OnlineOrdersComponent,
    ShoppingBasketComponent,
    Top5Component,
    RefundsComponent,
    SettingsComponent,
    SettingsSavedInfoDialogComponent,
    TicketTrackingComponent,
    ProductComponent,
    TechnicalSupportComponent,
    ChatWindowComponent
  ],

  imports: [
      HomeRoutingModule,
      SharedModule,
      ShopModule,
      ReactiveFormsModule,
      CarouselModule,
  ],

  providers: [
    ShoppingBasketService,
    CustomerPointsService,
    OnlineOrdersService
  ]
})
export class HomeModule {

}
