import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    MatIcon,
    NgClass,
    FormsModule
  ],
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    { article: { name: 'Product A' }, stars: 3, opinion: 'Good product!' },
    { article: { name: 'Product B' }, stars: 5, opinion: 'Excellent!' },
  ];

  rateProduct(review: any, stars: number) {
    review.stars = stars;
  }
}
