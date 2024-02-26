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
import {ReviewsComponent} from "./reviews/reviews.component";
import {ReviewDialogComponent} from "./reviews/review-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdviserComponent,
    ComplaintsComponent,
    ComplaintCreationDialogComponent,
    ReviewsComponent,
    ReviewDialogComponent,
    HomeComponent,
    ShoppingBasketComponent
  ],
    imports: [
        HomeRoutingModule,
        SharedModule,
        ShopModule,
        ReactiveFormsModule,
    ],
  providers: [
    ShoppingBasketService,
  ]
})
export class HomeModule {

}
