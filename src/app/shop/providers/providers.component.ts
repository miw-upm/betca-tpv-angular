import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {Provider} from './provider.model';
import {ProviderService} from './provider.service';
import {ProviderSearch} from './provider-search.model';
import {ProviderCreationUpdatingDialogComponent} from './provider-creation-updating-dialog.component';

@Component({
  templateUrl: 'providers.component.html'
})
export class ProvidersComponent {
  providerSearch: ProviderSearch;
  title = 'Providers management';
  providers = of([]);

  constructor(private dialog: MatDialog, private providerService: ProviderService) {
    this.resetSearch();
  }

  search(): void {
    this.providers = this.providerService.search(this.providerSearch);
  }

  resetSearch(): void {
    this.providerSearch = {};
  }

  create(): void {
    this.dialog
      .open(ProviderCreationUpdatingDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }

  read(provider: Provider): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Provider Details',
        object: this.providerService.read(provider.company)
      }
    });
  }

  update(provider: Provider): void {
    this.providerService
      .read(provider.company)
      .subscribe(fullProvider => this.dialog.open(ProviderCreationUpdatingDialogComponent, {data: fullProvider})
        .afterClosed()
        .subscribe(() => this.search())
      );
  }
}
