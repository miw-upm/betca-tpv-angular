import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable, of} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";
import {Article} from "../../shared/models/article.model";
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
        console.log(formattedOffer);
        return this.httpService
            .post(EndPoints.OFFERS, formattedOffer);
    }

    // TODO: Implementar método de lectura
    read(reference: string): Observable<Offer> {
        return of({
            reference,
            description: 'Mock Description for Update',
            creationDate: new Date(),
            expiryDate: new Date(),
            discount: 15,
            articles: this.getMockArticles()
        });
    }

    // TODO: Implementar método de actualización
    update(oldReference: string, offer: Offer): Observable<Offer> {
        return of({
            ...offer,
            reference: oldReference,
            articles: this.getMockArticles()
        });
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

    // TODO: Eliminar este método y sustituirlo por el servicio de artículos
    private getMockArticles(): Article[] {
        return [
            {
                barcode: '1234567890',
                description: 'Article 1',
                retailPrice: 100,
                providerCompany: 'Provider A',
                reference: 'article-1',
                stock: 50,
                tax: 0,  // Si tienes un tipo `Tax` puedes añadirlo aquí
                discontinued: false,
                registrationDate: new Date()
            },
            {
                barcode: '0987654321',
                description: 'Article 2',
                retailPrice: 150,
                providerCompany: 'Provider B',
                reference: 'article-2',
                stock: 30,
                tax: 1,
                discontinued: false,
                registrationDate: new Date()
            }
        ];
    }
}