import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-status-projet',
  templateUrl: './status-projet.component.html',
  styleUrls: ['./status-projet.component.css']
})
export class StatusProjetComponent implements OnInit {
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
              color: '#D9E5F5'
            },
            {
              name: 'Enrichissement Données',
              y: 4,
              color: '#65AED9'
            },
            {
              name: 'Attente Retour (Achat Délégué)',
              y: 3,
              color: '#81C4E8'
            },
            {
              name: 'Adjudication',
              y: 4,
              color: '#278FB6'
            },
            {
              name: 'Attente Retour (Fournisseur)',
              y: 4,
              color: '#EFF8FB'
            },
            {
              name: 'Lancement P2P',
              y: 3,
              color: '#4E67B0'
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
