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

  starRating = {
    'Entry Level Associate': {
      total: 0,
      average: 0,
      length: 0
    },
    'Lower Management': {
      total: 0,
      average: 0,
      length: 0
    },
    'Middle Management': {
      total: 0,
      average: 0,
      length: 0
    },
    'Upper Management': {
      total: 0,
      average: 0,
      length: 0
    },
    'Leadership': {
      total: 0,
      average: 0,
      length: 0
    }
  };

  behaviourRating = {
    'friendly': 0,
    'angry': 0,
    'neutral': 0,
    'busy': 0,
    'lazy': 0,
    'partial': 0
  };

  skillsRating = {
    'Excellent Communicator': {
      total: 0,
      average: 0,
      length: 0
    },
    'Knows his/her job': {
      total: 0,
      average: 0,
      length: 0
    },
    'Soft Spoken': {
      total: 0,
      average: 0,
      length: 0
    },
    'Supportive': {
      total: 0,
      average: 0,
      length: 0
    },
    'Fearless': {
      total: 0,
      average: 0,
      length: 0
    },
    'Motivator': {
      total: 0,
      average: 0,
      length: 0
    },
  };

  LIGHT_COLORS = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ];

  COLORS = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

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
    const company = this.navParams.get('company');
    this.backend.getFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks.filter(feedback => feedback.personalDetails.company == company);

      // Total star rating
      this.feedbacks.forEach(feedback => {
        // calculate total star rating
        this.starRating[feedback.personalDetails.designation].length += 1;
        this.starRating[feedback.personalDetails.designation].total += feedback.starRating;

        // calculate average manager behavioural rating
        Object.keys(this.behaviourRating).forEach(key => {
          if (feedback.managerBehaviour.indexOf(key) != -1) {
            this.behaviourRating[key] += 1;
          };
        });

        // calculate average manager skills rating
        // feedback.managerSkills.forEach(skill => {
        //   this.skillsRating[skill.name].total += skill.value;
        //   this.skillsRating[skill.name].length += 1;
        // });

      });

      // calculate average star rating
      Object.keys(this.starRating).forEach(key => {
        this.starRating[key].average = this.starRating[key].total / this.starRating[key].length;
        this.starRating[key].average = this.starRating[key].average || 0;
        // console.log(this.starRating[key].average);
      });

      // calculate average skills rating
      // Object.keys(this.skillsRating).forEach(key => {
      //   this.skillsRating[key].average = this.skillsRating[key].total / this.skillsRating[key].length;
      //   this.skillsRating[key].average = this.starRating[key].average || 0;
      //   // console.log(this.skillsRating[key].average);
      // });

      this.initCharts();
    });
  }

  getDataInstance(label: string, value, i?) {
    return {
      label,
      data: [value],
      backgroundColor: [
        this.LIGHT_COLORS[i]
      ],
      borderColor: [
        this.COLORS[i]
      ],
      borderWidth: 1
    };
  }

  initCharts() {
    // Avg Manager Star Rating
    this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          this.getDataInstance('Entry Level Associate', this.starRating['Entry Level Associate'].average, 0),
          this.getDataInstance('Lower Management', this.starRating['Lower Management'].average, 1),
          this.getDataInstance('Middle Management', this.starRating['Middle Management'].average, 2),
          this.getDataInstance('Upper Management', this.starRating['Upper Management'].average, 3),
          this.getDataInstance('Leadership', this.starRating['Leadership'].average, 4)
        ]
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

    // Avg Manager Behavioural Rating
    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          this.getDataInstance('friendly', this.behaviourRating.friendly, 0),
          this.getDataInstance('angry', this.behaviourRating.angry, 1),
          this.getDataInstance('neutral', this.behaviourRating.neutral, 2),
          this.getDataInstance('busy', this.behaviourRating.busy, 3),
          this.getDataInstance('lazy', this.behaviourRating.lazy, 4),
          this.getDataInstance('partial', this.behaviourRating.partial, 5)
        ]
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
    this.initCharts();
  }

}
