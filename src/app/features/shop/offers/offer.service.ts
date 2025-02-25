import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";
import {EndPoints} from "@core/end-points";

@Injectable({providedIn: 'root'})
export class OfferService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {}

    create(offer: Offer): Observable<Offer> {
        const formattedOffer = {
            ...offer,
            creationDate: this.formatDate(offer.creationDate),
            expiryDate: this.formatDate(offer.expiryDate),
        };
        return this.httpService
            .post(EndPoints.OFFERS, formattedOffer);
    }

    read(reference: string): Observable<Offer> {
        return this.httpService
            .get(EndPoints.OFFERS + '/' + reference);
    }

    update(oldReference: string, offer: Offer): Observable<Offer> {
        const formattedOffer = {
            ...offer,
            creationDate: this.formatDate(offer.creationDate),
            expiryDate: this.formatDate(offer.expiryDate),
        };
        return this.httpService
            .successful()
            .put(EndPoints.OFFERS + '/' + oldReference, formattedOffer);
    }

    search(offerSearch: OfferSearch): Observable<Offer[]> {
        return this.httpService
            .paramsFrom(offerSearch)
            .get(EndPoints.OFFERS + OfferService.SEARCH);
    }

    private formatDate(dateStr: Date | null) {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
    }
}