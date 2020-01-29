import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html'
})
export class StarRatingComponent {

  rating = 0;
  @Output() ratingChanged = new EventEmitter<number>();
  @Input() title:string;

  constructor() { }

  changeRating(index: number) {
    console.log(index)
    console.log(this.rating)

    if(index==0 && this.rating){
      this.rating = 0;
      this.ratingChanged.emit(this.rating);
    }else{
      this.rating = index + 1;
      this.ratingChanged.emit(this.rating);
    }    
  }

}
