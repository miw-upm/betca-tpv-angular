import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Offer } from '../shared/services/models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {

  private mock: Offer[] = [
    {
      reference: 'aaaa1',
      description: 'description1',
      creationDate: new Date(),
      expiryDate: new Date(),
      discount: 20,
      articles: [
        { barcode: '11111', description: 'Article1', retailPrice: 10, providerCompany: 'A' },
        { barcode: '22222', description: 'Article2', retailPrice: 20, providerCompany: 'A' },
      ],
    },
    {
      reference: 'dasdasd',
      description: 'description2',
      creationDate: new Date(),
      expiryDate: new Date(),
      discount: 12,
      articles: [
        { barcode: '43246', description: 'Article1', retailPrice: 10, providerCompany: 'A' },
        { barcode: '23123', description: 'Article4', retailPrice: 50, providerCompany: 'A' },
      ],
    },
    {
      reference: 'kjughjh',
      description: 'description3',
      creationDate: new Date(),
      expiryDate: new Date(),
      discount: 7,
      articles: [
        { barcode: '78686', description: 'Article3', retailPrice: 36, providerCompany: 'A' },
        { barcode: '65442', description: 'Article4', retailPrice: 50, providerCompany: 'A' },
      ],
    },
  ];

  constructor() {}

  create(offer: Offer): Observable<Offer> {
    this.mock.push(offer);
    return of(offer);
  }

  read(reference: string): Observable<Offer> {
    const offer = this.mock.find(o => o.reference === reference);
    return of(offer);
  }

  update(){
    //TODO
  }


  delete() {
    //TODO
  }

  search(term: string = ''): Observable<Offer[]> {
    if (!term.trim()) {
      return of(this.mock);
    }
    return of(this.mock.filter(offer => offer.reference.includes(term.toLowerCase())));
  }
}
