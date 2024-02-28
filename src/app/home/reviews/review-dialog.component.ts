import { Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {Review} from "./review.model";
import {Article} from "../shared/article.model";
import {User} from "@core/user.model";
import {ReviewService} from './review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})

export class ReviewDialogComponent {
  @Input()
  formControl: FormControl;
  starsFormControl = new FormControl('', [Validators.required]);
  opinionFormControl = new FormControl('', [Validators.maxLength(500)]);

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    public service: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: { article: Article, user: User, opinion: Review,start: Review,review?: Review }
  ) {
    if (this.data.review) {
      this.starsFormControl.setValue(this.data.review.stars);
      this.opinionFormControl.setValue(this.data.review.opinion);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitReview(): void {
    const newReview: Review = {
      user: this.data.user,
      article: this.data.article,
      stars: this.starsFormControl.value,
      opinion: this.opinionFormControl.value
    };

    this.service.create(newReview)
      .subscribe(
      (updatedReviews: Review[]) => {
        this.service.updateReviews();
        this.dialogRef.close();
      },
      error => {
        console.error("Error creating review:", error);
      }
    );
  }

  clearForm(): void {
    this.starsFormControl.reset();
    this.opinionFormControl.reset();
  }

}

