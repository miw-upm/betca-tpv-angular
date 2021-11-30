import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {ProviderService} from './provider.service';
import {Provider} from './provider.model';

@Component({
  templateUrl: 'provider-creation-updating-dialog.component.html',
  styleUrls: ['provider-dialog.component.css']
})

export class ProviderCreationUpdatingDialogComponent {
  provider: Provider;
  title: string;
  oldProvider: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Provider, private providerService: ProviderService, private dialog: MatDialog) {
    this.title = data ? 'Update Provider' : 'Create Provider';
    this.provider = data ? data : {company: undefined, nif: undefined, phone: undefined, active: true};
    this.oldProvider = data ? data.company : undefined;
  }

  isCreate(): boolean {
    return this.oldProvider === undefined;
  }

  create(): void {
    this.providerService
      .create(this.provider)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.providerService
      .update(this.oldProvider, this.provider)
      .subscribe(() => this.dialog.closeAll());
  }


  invalid(): boolean {
    return this.check(this.provider.company) || this.check(this.provider.nif) || this.check(this.provider.phone);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
