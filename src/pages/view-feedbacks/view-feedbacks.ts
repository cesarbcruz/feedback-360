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

  @ViewChild('barCanvas1') barCanvasGeral;
  barChart1: any;

  @ViewChild('barCanvas2') barCanvasProfile;
  barChart2: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    this.load();
  }
  ionViewDidLoad() {
    this.load();
  }

  ionViewDidEnter() {
    this.load();
  }

  load() {
    const uid = this.backend.getCurrentUser().uid;

    this.backend.getFeedbacks().subscribe(res => {
      let listData: Feedback[] = [];
      res.map(i =>
        Object.keys(i).map(x => {
          listData.push(...i[x])
        })
      );
      this.processData(listData, this.geralDataset);
      this.createChart(this.barCanvasGeral, this.geralDataset);
    });

    this.backend.getFeedbacksProfile(uid).subscribe(res => {
      let listData: Feedback[] = [];
      res.map(i => {
        Object.keys(i).map(x => {
          listData.push(i[x])
        })
      });

      this.processData(listData, this.profileDataset);
      this.createChart(this.barCanvasProfile, this.profileDataset);
    });
  }

  processData(listData, dataset) {
    listData.forEach(feedback => {
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

    Object.keys(dataset).forEach(key => {
      dataset[key].average = dataset[key].total / dataset[key].length;
      dataset[key].average = dataset[key].average || 0;
    });
  }

  getDataInstance(label: string, value) {
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

  createChart(barCanvas, data) {
    let dataset = [];
    Object.keys(data).forEach(key => {
      dataset.push(this.getDataInstance(key, data[key].average));
    });

    barCanvas = new Chart(barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: dataset
      },
      options: {

        legend: {
          display: true,
          labels: {
            fontSize: 10,
            boxWidth: 8,
            boxHeight: 1
          }
        },

        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                min: 0,
                max: 5,
              }
            }
          ]
        }
      }
    });
  }



}
