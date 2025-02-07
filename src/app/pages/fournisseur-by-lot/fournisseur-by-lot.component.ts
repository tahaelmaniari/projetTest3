import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  nombreProjet: any;
  constructor(private router : Router) {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
        width: 750
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [
          'Initiation Projet',
          'Enrichissement Données',
          'Attente Retour (Achat Délégué)',
          'Adjudication',
          'Attente Retour (Fournisseur)',
          'Lancement P2P'
 
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
              name: 'Initiation Projet',
              y: 2,
              color: '#DED592'
            },
            {
              name: 'Enrichissement Données',
              y: 4,
              color: '#2E86C1'
            },
            {
              name: 'Attente Retour (Achat Délégué)',
              y: 3,
              color: '#2E86C1'
            },
            {
              name: 'Adjudication',
              y: 4,
              color: '#CF1254'
            },
            {
              name: 'Attente Retour (Fournisseur)',
              y: 4,
              color: '#E918E3'
            },
            {
              name: 'Lancement P2P',
              y: 3,
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
              this.status = event.point.name
              this.nombreProjet = event.point.y
              console.log(event.point.y)
              this.router.navigate(['/pages/projets/'+this.status+'/'+this.nombreProjet])
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