import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';

import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {NumberDialogComponent} from '@shared/dialogs/number-dialog.component';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';

import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';

import {CrudComponent} from '@shared/components/crud.component';
import {DateComponent} from '@shared/components/date.component';
import {FooterComponent} from '@shared/components/footer.component';
import {SearchComponent} from '@shared/components/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    DateComponent,
    FooterComponent,
    LoginDialogComponent,
    NumberDialogComponent,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
  ],
  exports: [
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    DateComponent,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    FooterComponent,
    LoginDialogComponent,
    MaterialModule,
    NumberDialogComponent,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
  ]
})
export class SharedModule {
}
