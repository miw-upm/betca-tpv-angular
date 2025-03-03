import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";
import {EndPoints} from "@core/end-points";

@Injectable({providedIn: 'root'})
export class OfferService {
    static readonly SEARCH = '/search';
    static readonly PDF = '/pdf';

    constructor(private readonly httpService: HttpService) {}

    create(offer: Offer): Observable<Offer> {
        const formattedOffer = {
            ...offer,
            creationDate: this.formatDate(offer.creationDate),
            expiryDate: this.formatDate(offer.expiryDate),
        };
        return this.httpService
            .successful("Offer created successfully.")
            .error('Offer creation failed. Please check the values and try again.')
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
            .successful("Offer updated successfully.")
            .error('Offer update failed. Please check the values and try again.')
            .put(EndPoints.OFFERS + '/' + oldReference, formattedOffer);
    }

    search(offerSearch: OfferSearch): Observable<Offer[]> {
        return this.httpService
            .paramsFrom(offerSearch)
            .get(EndPoints.OFFERS + OfferService.SEARCH);
    }

    printPdf(reference: string): Observable<any> {
        return this.httpService.pdf().get(EndPoints.OFFERS + '/' + reference + OfferService.PDF);
    }

    private formatDate(dateStr: Date | null) {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
    }
}