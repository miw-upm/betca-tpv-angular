import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SlideInterface} from './slide.interface';
import {ShoppingBasketService} from "../../../home/shopping-basket/shopping-basket.service";

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: SlideInterface[] = [];

  currentIndex: number = 0;
  timeoutId?: number;
  class: string;
  static time: number = 3000;

  constructor(private shoppingBasketService: ShoppingBasketService) {
  } // Inject ShoppingBasketService

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }

  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    //window.setTimeout(() => this.class = "fadeOut", CarouselComponent.time-500);
    this.timeoutId = window.setTimeout(() => this.goToNext(), CarouselComponent.time);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  dotSelected(slideIndex: number): string {
    return slideIndex == this.currentIndex ? "dot-selected" : null;
  }

  getCurrentSlideImageUrl() {
    //return `url('${this.slides[this.currentIndex].url}')`;
    return "url('https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg')";
  }

  getCurrentSlideUrl() {
    return this.slides[this.currentIndex].url;
  }

  getCurrentSlideStrip() {
    return this.slides[this.currentIndex].strip;
  }

  getCurrentSlideDescription() {
    return this.slides[this.currentIndex].description;
  }

  getCurrentArticle() {
    return this.slides[this.currentIndex].article;
  }

  addToShoppingCart() {
    const currentArticle = this.getCurrentArticle();
    if (currentArticle) {
      this.shoppingBasketService.addArticle(currentArticle);
    }
  }
}
