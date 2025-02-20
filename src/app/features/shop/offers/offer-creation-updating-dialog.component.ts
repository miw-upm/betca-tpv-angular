import {Component, Inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Observable, of} from 'rxjs';

import {OfferService} from './offer.service';
import {SearchByCompanyComponent} from '../shared/components/search-by-company.component';
import {Offer} from "../shared/models/offer.model";

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
        MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
        NgForOf],
    templateUrl: 'offer-creation-updating-dialog.component.html',
    styleUrls: ['offer-creation-updating-dialog.component.css']
})
export class OfferCreationUpdatingDialogComponent {
    offer: Offer;
    title: string;
    oldReference: string;
    companies: Observable<string[]> = of([]);

    constructor(@Inject(MAT_DIALOG_DATA) data: Offer, private readonly offerService: OfferService, private readonly dialog: MatDialog) {
        this.title = data ? 'Update Offer' : 'Create Offer';
        this.offer = data || {
            reference: undefined, description: undefined, creationDate: undefined, expiryDate: undefined,
            discount: undefined, articles: []
        };
        this.oldReference = data ? data.reference : undefined;
    }

    isCreate(): boolean {
        return this.oldReference === undefined;
    }

    create(): void {
        this.offerService
            .create(this.offer)
            .subscribe(() => this.dialog.closeAll());
    }

    update(): void {
        this.offerService
            .update(this.oldReference, this.offer)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.offer.reference) || this.check(this.offer.description) || (this.offer.discount === undefined || null);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }

}
