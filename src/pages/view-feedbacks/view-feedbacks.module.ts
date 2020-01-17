import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewFeedbacksPage } from './view-feedbacks';

@NgModule({
  declarations: [
    ViewFeedbacksPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewFeedbacksPage),
  ],
})
export class ViewFeedbacksPageModule {}
