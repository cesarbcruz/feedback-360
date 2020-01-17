import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class CommonProvider {

  constructor(
    private toast: ToastController,
    private loading: LoadingController
  ) { }

  getToast(message: string, duration = 1500) {
    const instance = this.toast.create({
      message,
      duration
    });
    return instance;
  }

  getLoading(content: string) {
    const instance = this.loading.create({
      content
    });
    return instance;
  }

}
