import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-fournisseur-by-lot',
  templateUrl: './fournisseur-by-lot.component.html',
  styleUrls: ['./fournisseur-by-lot.component.css']
})
export class FournisseurByLotComponent implements OnInit {
  status: any;
  chart: Chart;
  nb : any
  constructor() {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
        width: 450
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [
          'En cours',
          'Clotûré',
          'En attente',
        ]
      },
      yAxis: {
        title: {
          text: 'Lots'
        }
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'Clotûré',
              y: 6,
              color: '#2E86C1'
            },
            {
              name: 'En attente',
              y: 10,
              color: ' #58D68D'
            },
            {
              name: 'En cours',
              y: 20,
              color: '#A569BD'
            },
          ],
        }
      ],
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          events: {
            click: (event) => {
              console.log('Clicked on series:', event.point.name);
              this.status = event.point.name
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.nb = Array.from({length: 5}, (_, index) => index + 1);
  }
}
