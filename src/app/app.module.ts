import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from '@core/core.module';
import {AppRoutesModule} from './app-routes.module';
import {AppComponent} from './app.component';


@NgModule({
  imports: [
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    // HomeModule // eager load
    // ShopModule // eager load
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
