import { NgModule } from '@angular/core';
import { StarRatingComponent } from './star-rating/star-rating';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [StarRatingComponent],
	imports: [IonicModule],
	exports: [StarRatingComponent]
})
export class ComponentsModule {}
