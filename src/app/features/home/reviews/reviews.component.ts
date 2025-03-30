import { Component, OnInit } from '@angular/core';
import { Review } from './model/review.model';
import { ReviewService } from './service/review.service';
import { NgClass } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    NgClass,
    MatIcon,
    FormsModule
  ],
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  popularArticleId: string = '';

  currentUserId: string = 'user1';
  currentArticleId: string = 'article1';

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviewsForUser(this.currentUserId);
    this.loadPopularArticleId();
  }

  loadReviewsForUser(userId: string): void {
    this.reviewService.getByUser(userId).subscribe(
        reviews => {
          this.reviews = reviews;
        },
        error => {
          console.error('Error loading reviews:', error);
        }
    );
  }

  loadPopularArticleId(): void {
    this.reviewService.getPopular().subscribe(
        id => {
          this.popularArticleId = id;
        },
        error => {
          console.error('Error loading popular article id:', error);
        }
    );
  }

  rateProduct(review: Review, stars: number): void {
    review.stars = stars;
    if (review.id) {
      this.reviewService.update(review.id, review).subscribe(
          updatedReview => {
            console.log('Review updated:', updatedReview);
          },
          error => {
            console.error('Error updating review:', error);
          }
      );
    } else {
      review.userId = this.currentUserId;
      if (!review.article) {
        review.article = {
          id: this.currentArticleId,
          name: 'Product Name',
          imageUrl: 'assets/img/default.png',
          description: 'Product description'
        };
      }
      this.reviewService.create(review).subscribe(
          createdReview => {
            review.id = createdReview.id;
            console.log('Review created:', createdReview);
            this.loadReviewsForUser(this.currentUserId);
          },
          error => {
            console.error('Error creating review:', error);
          }
      );
    }
  }
}
