import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';

import {ProviderService} from './provider.service';
import {ReadDetailDialogComponent} from '@common/dialogs/read-detail.dialog.component';
import {CrudComponent} from '@common/components/crud.component';
import {FilterInputComponent} from "@common/components/filter-input.component";
import {ProviderCreationUpdatingDialogComponent} from './provider-creation-updating-dialog.component';
import {Provider} from './provider.model';
import {ProviderSearch} from './provider-search.model';

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatIcon, CrudComponent, MatCardTitle, FilterInputComponent,
        MatButton],
    templateUrl: 'providers.component.html'
})
export class ProvidersComponent {
    providerSearch: ProviderSearch;
    title = 'Providers management';
    providers = of([]);

    constructor(private readonly dialog: MatDialog, private readonly providerService: ProviderService) {
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
