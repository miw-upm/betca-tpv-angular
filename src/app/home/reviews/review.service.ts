import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import { HttpService } from '@core/http.service';
import { Review } from './review.model';
import {Role} from "@core/role.model";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private mockReviews: Review[] = [
    {
      user: { token: 'user_token', mobile: 1234567890, name: 'Jane Doe', role: Role.CUSTOMER },
      article: { barcode: '11', description: 'Another Product', retailPrice: 14.99 },
      stars: null,
      opinion:'' },
    {
      user: {token: "user_token", mobile: 66, name: "John Doe", role: Role.CUSTOMER },
      article: { barcode:'22', description:'Sample article description', retailPrice:90 },
      stars: 5,
      opinion: 'Great article!'},
    { user: { token: 'user_token', mobile: 1234567890, name: 'Jane Doe', role: Role.CUSTOMER },
      article: { barcode: '33', description: 'Another Product', retailPrice: 14.99 },
      stars: 4,
      opinion: 'Excellent quality, worth every penny.' },

  ];
  reviewsChanged = new BehaviorSubject<Review[]>([]);

  constructor(private httpService: HttpService) {}

  getMockReviews(): Review[] {
    return this.mockReviews;
  }

  create(review: Review): Observable<Review[]> {
    const existingReviewIndex = this.mockReviews.findIndex(existingReview => existingReview.article.barcode === review.article.barcode);
    if (existingReviewIndex !== -1) {
      this.mockReviews[existingReviewIndex] = review;
    } else {
      this.addReview(review);
    }
    return of(this.mockReviews);
  }

  private addReview(review: Review): void {
    this.mockReviews.push(review);
  }

  searchByArticleBarcode(barcode: string): Observable<Review[]> {
    const filteredReviews = this.mockReviews.filter(review => review.article.barcode === barcode);
    return of(filteredReviews);
  }

  read(id: string): Observable<Review> {
    const review = this.mockReviews.find(r => r.article.barcode === id);
    return of(review);
  }

  delete(id: string): Observable<void> {
    this.mockReviews.forEach(review => {
      if (review.article.barcode === id) {
        delete review.stars;
        delete review.opinion;
      }
    });
    return of(null);
  }

  updateReviews(): void {
    const observables = this.mockReviews.map(review => {
      return this.searchByArticleBarcode(review.article.barcode);
    });
    forkJoin(observables).subscribe(newReviewsArray => {
      newReviewsArray.forEach(newReviews => {
        newReviews.forEach(newReview => {
          const index = this.mockReviews.findIndex(existingReview => existingReview.article.barcode === newReview.article.barcode);
          if (index !== -1) {
            this.mockReviews[index] = newReview;
          }
        });
      });
      this.reviewsChanged.next([...this.mockReviews]);
    });
  }

}

