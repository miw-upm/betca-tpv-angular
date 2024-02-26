import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Article} from "../shared/article.model";
import {User} from "@core/user.model";
import {Review} from "./review.model";
import {ReviewDialogComponent} from "./review-dialog.component";
import {ReviewService} from "./review.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-review',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews: Review[] = [];
  displayedColumns = ['barcode', 'stars', 'opinion', 'actions'];
  user: User;
  article: Article;
  barcode: string;
  displayNoReviewMessage: boolean = false;
  private reviewSubscription: Subscription;

  constructor(private dialog: MatDialog, private reviewService: ReviewService) { }

  ngOnInit(): void{
    this.reviewSubscription = this.reviewService.reviewsChanged.subscribe(reviews => {
      this.reviews = reviews;
    });
    this.reviews= this.reviewService.getMockReviews();
  }

  ngOnDestroy(): void {
    if (this.reviewSubscription) {
      this.reviewSubscription.unsubscribe();
    }
  }
  search(): void {
    if (this.barcode.trim() !== '') {
      this.reviewService.read(this.barcode)
        .subscribe(review => {
          if (review) {
            this.reviews = [review];
          } else {
            this.reviews = [];
            this.displayNoReviewMessage = true;
          }
        });
    } else {
      this.displayNoReviewMessage = false;
    }
  }

  openReviewDialog(article: Article): void {
    this.article = article;
    const index = this.reviews.findIndex(review => review.article.barcode === article.barcode);
    if (index !== -1) {
      const user = this.reviews[index].user;
      const dialogRef = this.dialog.open(ReviewDialogComponent, {
        width: '400px',
        data: { article: article, user: user }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.updateReviews();
        }
      });
    } else {
      console.error('No review found with matching barcode:', article.barcode);
    }
  }

  openEditReviewDialog(review: Review): void {
    this.article = review.article;
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: {article: review.article, user: review.user, review: review}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.reviews.findIndex(r => r.article.barcode === review.article.barcode);
        if (index !== -1) {
          this.reviews[index] = result;
          this.updateReviews();
        }
      }
    });
  }

  deleteReview(review: Review): void {
    this.reviewService.delete(review.article.barcode).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.article.barcode !== review.article.barcode);
      },
      error: (error) => {
        console.error('Error deleting review:', error);
      }
    });
  }

  updateReviews(): void {
    this.reviewService.searchByArticleBarcode(this.article.barcode).subscribe(newReviews => {
      newReviews.forEach(newReview => {
        const index = this.reviews.findIndex(existingReview => existingReview.article.barcode === newReview.article.barcode);
        if (index !== -1) {
          this.reviews[index] = newReview;
        } else {
          this.reviews.push(newReview);
        }
      });
    });
  }

  getAverageStars(article: Article): number {
    const articleReviews = this.reviews.filter(r => r.article === article);
    if (articleReviews.length === 0) {
      return 0;
    }
    const totalStars = articleReviews.reduce((sum, r) => sum + r.stars, 0);
    return totalStars / articleReviews.length;
  }

}






