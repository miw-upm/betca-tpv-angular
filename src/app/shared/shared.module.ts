import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';

import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {NumberDialogComponent} from '@shared/dialogs/number-dialog.component';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {RegisterDialogComponent} from '@shared/dialogs/register-dialog.component';
import {RecoverPasswordDialogComponent} from '@shared/dialogs/recoverPassword-dialog.component';

import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';

import {CrudComponent} from '@shared/components/crud.component';
import {DateComponent} from '@shared/components/date.component';
import {FooterComponent} from '@shared/components/footer.component';
import {SearchComponent} from '@shared/components/search.component';
import {ProfileSettingsComponent} from '@shared/components/profile-settings/profile-settings.component';
import {UserCompleteService} from '@shared/services/userComplete.service';
import {ManageDataProtectionActComponent} from '@shared/components/data-protection-act/manage-data-protection-act.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        FlexModule,
        ReactiveFormsModule
    ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    DateComponent,
    FooterComponent,
    LoginDialogComponent,
    ManageDataProtectionActComponent,
    NumberDialogComponent,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
    RegisterDialogComponent,
    ProfileSettingsComponent,
    RecoverPasswordDialogComponent,

  ],
  providers: [UserCompleteService],
  exports: [
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    DateComponent,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    LoginDialogComponent,
    ManageDataProtectionActComponent,
    MaterialModule,
    NumberDialogComponent,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
    RegisterDialogComponent,
    RecoverPasswordDialogComponent
  ],
  entryComponents: [
    CancelYesDialogComponent,
    LoginDialogComponent,
    NumberDialogComponent,
    ReadDetailDialogComponent,
    RegisterDialogComponent,
    RecoverPasswordDialogComponent,
  ]
})
export class SharedModule {
}
