import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http.service";
import {Observable, of} from "rxjs";
import {OfferSearch} from "./offer-search.model";
import {Offer} from "../shared/models/offer.model";
import {Article} from "../shared/models/article.model";
import {EndPoints} from "@core/end-points";

@Injectable({providedIn: 'root'})
export class OfferService {
    static readonly SEARCH = '/search';

    constructor(private readonly httpService: HttpService) {}

    create(offer: Offer): Observable<Offer> {
        return this.httpService
            .post(EndPoints.OFFERS, offer);
    }

    // Método de lectura (mock de oferta)
    read(reference: string): Observable<Offer> {
        return of({
            reference,
            description: 'Mock Description for Update',
            creationDate: new Date(),
            expiryDate: new Date(),
            discount: 15,
            articles: this.getMockArticles()  // Incluimos artículos mock aquí
        });
    }

    // Método de actualización (mock de oferta con artículos)
    update(oldReference: string, offer: Offer): Observable<Offer> {
        return of({
            ...offer,
            reference: oldReference,
            articles: this.getMockArticles()  // Agregamos artículos mock al hacer un update
        });
    }

    // Método de búsqueda (mock de búsqueda de ofertas)
    search(offerSearch: OfferSearch): Observable<Offer[]> {
        return of([
            {
                reference: 'mock-ref-1',
                description: 'Mock Description 1',
                creationDate: new Date(),
                expiryDate: new Date(),
                discount: 10,
                articles: this.getMockArticles()  // También añadimos artículos aquí
            },
            {
                reference: 'mock-ref-2',
                description: 'Mock Description 2',
                creationDate: new Date(),
                expiryDate: new Date(),
                discount: 20,
                articles: this.getMockArticles()  // Agregamos artículos
            }
        ]);
    }

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