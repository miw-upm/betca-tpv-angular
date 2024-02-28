import { Component, OnInit } from '@angular/core';
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {OfferService} from "./offers.service";
import {Offer} from "../shared/services/models/offer.model";
import {OrderSearch} from "../orders/ordersearch.model";
import {OfferSearch} from "./offers-search.model";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  title = 'Offers management';
  offers = of([]);
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
    //TODO
  }

  read(offer: Offer): void {
    //TODO
  }

  delete(offer: Offer): void {
    //TODO
  }

  update(offer: Offer): void {
    //TODO
  }
}
