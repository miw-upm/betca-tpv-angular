import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {forkJoin, Observable, of} from 'rxjs';

import {OfferService} from './offers.service';
import {Offer} from "../shared/services/models/offer.model";
import {Article} from "../shared/services/models/article.model";
import {ArticleService} from "../articles/article.service";

@Component({
  templateUrl: 'offers-creation-updating-dialog.component.html',
  styleUrls: ['offers-dialog.component.css']
})

export class OffersCreationUpdatingDialogComponent {
  offer: Offer;
  title: string;
  oldReference: string;
  articleBarcodes: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Offer,
    private offerService: OfferService,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
    this.title = data ? 'Update Offer' : 'Create Offer';
    this.offer = data ? data : {
      reference: undefined,
      description: undefined,
      creationDate: new Date(),
      expiryDate: new Date(),
      discount: undefined,
      articles: []
    };
    this.oldReference = data ? data.reference : undefined;
  }

  isCreate(): boolean {
    return this.oldReference === undefined;
  }

  create(): void {
    const barcodeArray: string[] = this.articleBarcodes.split(',');
    const barcodeObservables: Observable<Article>[] = barcodeArray.map(barcode =>
      this.articleService.read(barcode)
    );

    forkJoin(barcodeObservables).subscribe((articles: Article[]) => {
      this.offer.articles = articles;
      this.offerService.create(this.offer).subscribe(() => this.dialog.closeAll());
    });
  }

  update(): void {
    //TODO
  }

  invalid(): boolean {
    return (
      this.check(this.offer.reference) ||
      this.check(this.offer.description) ||
      this.offer.discount === undefined ||
      this.offer.articles.some((article) => this.check(article.barcode))
    );
  }

  check(attr: string | number | Date): boolean {
    return attr === undefined || attr === null || attr === '';
  }
}
