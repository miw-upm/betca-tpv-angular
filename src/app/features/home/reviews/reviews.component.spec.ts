import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsComponent } from './reviews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewService } from './service/review.service';
import { of } from 'rxjs';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;
  let reviewService: ReviewService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReviewsComponent],
      providers: [ReviewService]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    reviewService = TestBed.inject(ReviewService);
    spyOn(reviewService, 'getByUser').and.returnValue(of([]));
    spyOn(reviewService, 'getPopular').and.returnValue(of('popular123'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
