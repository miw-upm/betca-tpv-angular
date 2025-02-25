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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Observable, of} from 'rxjs';

import {OfferService} from './offer.service';
import {SearchByCompanyComponent} from '../shared/components/search-by-company.component';
import {Offer} from "../shared/models/offer.model";
import {SearchByBarcodeComponent} from "../../shared/components/search-by-barcode.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {Article} from "../../shared/models/article.model";
import {SharedShopArticleService} from "../shared/services/shared-shop.article.service";

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
        MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
        NgForOf, SearchByBarcodeComponent, MatCard, MatCardContent, MatList, MatListItem, MatIcon, MatIconButton],
    templateUrl: 'offer-creation-updating-dialog.component.html',
    styleUrls: ['offer-creation-updating-dialog.component.css']
})
export class OfferCreationUpdatingDialogComponent {
    offer: Offer;
    title: string;
    oldReference: string;
    companies: Observable<string[]> = of([]);

    constructor(@Inject(MAT_DIALOG_DATA) data: Offer,
                private readonly offerService: OfferService,
                private readonly dialog: MatDialog,
                private readonly sharedshopArticleService: SharedShopArticleService
    ) {
        this.title = data ? 'Update Offer' : 'Create Offer';
        this.offer = data || {
            reference: undefined, description: undefined, creationDate: undefined, expiryDate: undefined,
            discount: undefined, articleList: []
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

    addArticle(barcode: string): void {
        this.sharedshopArticleService
            .read(barcode)
            .subscribe(article => {
                if(!this.offer.articleList.some(a => a.barcode === article.barcode)) {
                    this.offer.articleList.push(article);
                }
            });
    }

    removeArticle(article: Article): void {
        this.offer.articleList = this.offer.articleList.filter(a => a.barcode !== article.barcode);
    }
}
