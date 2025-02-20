import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {CrudComponent} from "@common/components/crud.component";
import {FilterInputComponent} from "@common/components/filter-input.component";
import {MatButton} from "@angular/material/button";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@common/dialogs/read-detail.dialog.component";
import {OfferSearch} from "./offer-search.model";
import {OfferService} from "./offer.service";
import {Offer} from "../shared/models/offer.model";
import {OfferCreationUpdatingDialogComponent} from "./offer-creation-updating-dialog.component";

@Component({
    standalone: true,
    imports: [MatCard, MatCardContent, FormsModule, MatSlideToggle, MatIcon, CrudComponent,
        FilterInputComponent, MatButton, MatCardTitle],
    templateUrl: 'offers.component.html'
})
export class OffersComponent {
    offerSearch: OfferSearch;
    title = 'Offers management';
    offers = of([]);

    constructor(private readonly dialog: MatDialog, private readonly offerService: OfferService) {
        this.resetSearch();
    }

    search(): void {
        this.offers = this.offerService.search(this.offerSearch);
    }

    resetSearch(): void {
        this.offerSearch = {creationDate: undefined, description: "", discount: 0, expiryDate: undefined, reference: ""};
    }

    create(): void {
        this.dialog.open(OfferCreationUpdatingDialogComponent);
    }

    read(offer: Offer): void {
        this.dialog.open(ReadDetailDialogComponent, {
            data: {
                title: 'Offer Details',
                object: this.offerService.read(offer.reference)
            }
        });
    }

    update(offer: Offer): void {
        this.offerService.read(offer.reference)
            .subscribe(fullOffer => this.dialog.open(OfferCreationUpdatingDialogComponent, {data: fullOffer}));
    }

    print (item: any): void {
        console.log('Imprimiendo:', item);
    }
}