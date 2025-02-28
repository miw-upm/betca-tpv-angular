import {OfferService} from "../../shop/offers/offer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../shop/shared/models/offer.model";
import {Component, OnInit} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatList, MatListItem} from "@angular/material/list";
import {FilterInputComponent} from "@common/components/filter-input.component";
import {MatButton} from "@angular/material/button";
import {MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-details.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        MatGridList,
        MatGridTile,
        MatList,
        MatListItem,
        FilterInputComponent,
        MatButton,
        MatCardContent,
        MatIcon
    ],
    styleUrls: ['./offer-detail.component.css']
})

export class OfferDetailsComponent implements OnInit{
    title = 'Offer details';
    offer?: Offer;

    constructor(
        private route: ActivatedRoute,
        private offerService: OfferService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getOfferDetails();
    }

    getOfferDetails(): void {
        const reference = this.route.snapshot.paramMap.get('reference');
        this.offerService.read(reference).subscribe({
            next: (offer) => {
                this.offer = offer;
            },
            error: () => {
                this.router.navigate(['/home/adviser']);
            }
        });
    }
}