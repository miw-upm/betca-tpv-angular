import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable, of} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";

@Injectable({providedIn: 'root'})
export class OfferService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {
    }

    create(offer: Offer): Observable<Offer> {
        //TODO: Implement this method and remove mock
        return of({ ...offer, id: 'mock-id' });
    }

    read(reference: string): Observable<Offer> {
        //TODO: Implement this method and remove mock
        return of({
            reference,
            description: 'Mock Description',
            creationDate: new Date(),
            expiryDate: new Date(),
            discount: 10,
            articles: []
        });
    }

    update(oldReference: string, offer: Offer): Observable<Offer> {
        //TODO: Implement this method and remove mock
        return of({ ...offer, reference: oldReference });
    }

    search(offerSearch: OfferSearch): Observable<Offer[]> {
        //TODO: Implement this method and remove mock
        return of([
            {
                reference: 'mock-ref-1',
                description: 'Mock Description 1',
                creationDate: new Date(),
                expiryDate: new Date(),
                discount: 10,
                articles: []
            },
            {
                reference: 'mock-ref-2',
                description: 'Mock Description 2',
                creationDate: new Date(),
                expiryDate: new Date(),
                discount: 20,
                articles: []
            }
        ]);
    }
}