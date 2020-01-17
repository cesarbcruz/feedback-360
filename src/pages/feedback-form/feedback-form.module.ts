import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackFormPage } from './feedback-form';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FeedbackFormPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FeedbackFormPage),
  ],
})
export class FeedbackFormPageModule {}
