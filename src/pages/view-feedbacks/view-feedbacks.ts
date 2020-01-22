import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { BackendProvider } from '../../providers/backend/backend';
import { Feedback } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-view-feedbacks',
  templateUrl: 'view-feedbacks.html',
})
export class ViewFeedbacksPage {

  feedbacks: Feedback[] = [];

  geralDataset = {
  };

  profileDataset = {
  };


  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }

  @ViewChild('barCanvas1') barCanvas1;
  barChart1: any;

  @ViewChild('barCanvas2') barCanvas2;
  barChart2: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    const uid = this.backend.getCurrentUser().uid;

    this.backend.getFeedbacks().subscribe(res => {
      let listData: Feedback[] = [];
      res.map(i =>
        Object.keys(i).map(x => {
          listData.push(...i[x])
        })
      );
      this.processData(listData, this.geralDataset);
      this.initChartsGeral();
    });

    this.backend.getFeedbacksProfile(uid).subscribe(res => {
      let listData: Feedback[] = [];
      res.map(i => {
        Object.keys(i).map(x => {
          listData.push(i[x])
        })
      });
      console.log(listData);


      this.processData(listData, this.profileDataset);
      this.initChartProfile();
    });

  }


  processData(listData, dataset) {
    // Total star rating
    listData.forEach(feedback => {
      // calculate total star rating
      if (!dataset[feedback.skill]) {
        dataset[feedback.skill] = {
          total: 0,
          average: 0,
          length: 0
        }
      }
      dataset[feedback.skill].length += 1;
      dataset[feedback.skill].total += feedback.rating;
    });

    // calculate average star rating
    Object.keys(dataset).forEach(key => {
      dataset[key].average = dataset[key].total / dataset[key].length;
      dataset[key].average = dataset[key].average || 0;
    });
  }

  getDataInstance(label: string, value, i?) {
    return {
      label,
      data: [value],
      backgroundColor: [
        this.getRandomColor()
      ],
      borderColor: [
        "#f4f4f4"
      ],
      borderWidth: 1
    };
  }

  initChartsGeral() {
    // Avg Manager Geral Rating

    let dataset = [];

    Object.keys(this.geralDataset).forEach(key => {
      dataset.push(this.getDataInstance(key, this.geralDataset[key].average, 0));
    });

    this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: dataset
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                min: 0,
                max: 5
              }
            }
          ]
        }
      }
    });

  }

  initChartProfile() {
    // Avg Manager Profile Rating

    let dataset = [];

    Object.keys(this.profileDataset).forEach(key => {
      dataset.push(this.getDataInstance(key, this.profileDataset[key].average, 0));
    });

    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: dataset,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                min: 0,
                max: 5
              }
            }
          ]
        }
      }
    });
  }

  ionViewDidLoad() {
    this.initChartsGeral();
    this.initChartProfile();
  }

}
