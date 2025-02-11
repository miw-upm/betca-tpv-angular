import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';

import {ProviderService} from './provider.service';
import {Provider} from './provider.model';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  standalone:true,
  templateUrl: 'provider-creation-updating-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatHint,
    FormsModule,
    MatInput,
    MatSlideToggle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgIf
  ],
  styleUrls: ['provider-dialog.component.css']
})

export class ProviderCreationUpdatingDialogComponent {
  provider: Provider;
  title: string;
  oldProvider: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Provider, private readonly providerService: ProviderService, private readonly dialog: MatDialog) {
    this.title = data ? 'Update Provider' : 'Create Provider';
    this.provider = data || {company: undefined, nif: undefined, phone: undefined, active: true};
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
