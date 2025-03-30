import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { EndPoints } from '@core/end-points';
import { Review } from '../model/review.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private static readonly REVIEWS: string = EndPoints.REVIEWS;

    constructor(
        private readonly httpService: HttpService,
        private readonly httpClient: HttpClient
    ) {}

    create(review: Review): Observable<Review> {
        return this.httpService.post(ReviewService.REVIEWS, review);
    }

    getByArticle(articleId: string): Observable<Review[]> {
        return this.httpService.get(ReviewService.REVIEWS + '/article/' + articleId);
    }

    getByUser(userId: string): Observable<Review[]> {
        return this.httpService.get(ReviewService.REVIEWS + '/user/' + userId);
    }

    update(id: string, review: Review): Observable<Review> {
        return this.httpService.put(ReviewService.REVIEWS + '/' + id, review);
    }

    delete(id: string): Observable<void> {
        return this.httpService.delete(ReviewService.REVIEWS + '/' + id);
    }

    getPopular(): Observable<string> {
        return this.httpClient.get(ReviewService.REVIEWS + '/popular', { responseType: 'text' });
    }
}
