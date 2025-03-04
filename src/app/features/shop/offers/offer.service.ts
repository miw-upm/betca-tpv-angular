import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";
import {EndPoints} from "@core/end-points";
import {SharedDateFormatterService} from "../shared/services/shared.date-formatter.service";

@Injectable({providedIn: 'root'})
export class OfferService {
    static readonly SEARCH = '/search';
    static readonly PDF = '/pdf';

    constructor(private readonly httpService: HttpService, private readonly SharedDateFormatterService: SharedDateFormatterService) {}

    create(offer: Offer): Observable<Offer> {
        const formattedOffer = {
            ...offer,
            creationDate: this.SharedDateFormatterService.formatDate(offer.creationDate),
            expiryDate: this.SharedDateFormatterService.formatDate(offer.expiryDate),
        };
        return this.httpService
            .successful("Offer created successfully.")
            .error('Offer creation failed. Please check the values and try again.')
            .post(EndPoints.OFFERS, formattedOffer);
    }

    read(reference: string): Observable<Offer> {
        return this.httpService
            .error("Offer not found.")
            .get(EndPoints.OFFERS + '/' + reference);
    }

    update(oldReference: string, offer: Offer): Observable<Offer> {
        const formattedOffer = {
            ...offer,
            creationDate: this.SharedDateFormatterService.formatDate(offer.creationDate),
            expiryDate: this.SharedDateFormatterService.formatDate(offer.expiryDate),
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

}