import { Component} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {OfferService} from "./offers.service";
import {Offer} from "../shared/services/models/offer.model";
import {OfferSearch} from "./offers-search.model";
import {OffersCreationUpdatingDialogComponent} from "./offers-creation-updating-dialog.component";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {ArticleCreationUpdatingDialogComponent} from "../articles/article-creation-updating-dialog.component";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  title = 'Offers management';
  offers = of([]);
  articles: Observable<string[]> = of([]);
  public offerSearch: OfferSearch;

  constructor(private dialog: MatDialog, private offerService: OfferService) {
    this.resetSearch();
  }

  search(): void {
    this.offers = this.offerService.search();
  }

  public resetSearch(): void {
    this.offerSearch = {};
    this.search();
  }

  create(): void {
    this.dialog.open(OffersCreationUpdatingDialogComponent);
  }

  read(offer: Offer): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Offer Details',
        object: this.offerService.read(offer.reference)
      }
    });
  }

  delete(offer: Offer): void {
    //TODO
  }

  update(offer: Offer): void {
    this.offerService.read(offer.reference)
      .subscribe(fullOffer => this.dialog.open(OffersCreationUpdatingDialogComponent, {data: fullOffer}));
  }
}
