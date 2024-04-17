import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-notation-fournisseur',
  templateUrl: './notation-fournisseur.component.html',
  styleUrls: ['./notation-fournisseur.component.css']
})
export class NotationFournisseurComponent implements OnInit {

  chart = new Chart({
    chart: {
    type: 'bar',
    height: 395,
    width:600
    },
    title: {
    text: ''
    },
    xAxis: {
    categories: [
    'Mieux Disant',
    'Moins disant',
    'Hors budget',
    ]
    },
    yAxis: {
    title: {
    text: ''
    }
    },
    series: [
    {
    type: 'bar',
    showInLegend: false,
    data: [
    {
    name: 'Mieux Disant',
    y: 4,
    color: '#58D68D',
    },
    {
    name: 'Moins Disant',
    y: 2,
    color: '#34495E',
    },
    {
    name: 'Hors Budget',
    y: 5,
    color: '#A569BD',
    },
    ]
    }
    ],
    credits: {
    enabled: false
    }
    })
    constructor(){
   
    }
   
    ngOnInit(): void {
   
    }
   }
