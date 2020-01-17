import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html'
})
export class StarRatingComponent {

  rating = 0;
  @Output() ratingChanged = new EventEmitter<number>();

  constructor() { }

  changeRating(index: number) {
    this.rating = index + 1;
    this.ratingChanged.emit(this.rating);
  }

}
