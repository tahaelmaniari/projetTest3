import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-projet-by-lot',
  templateUrl: './projet-by-lot.component.html',
  styleUrls: ['./projet-by-lot.component.css']
})
export class ProjetByLotComponent implements OnInit {

  chart = new Chart({
  chart:{
  type: 'line',
  height: 325,
  width:650
  },
  title:{
  text : ''
  },
  xAxis:{
  categories:[
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
  ]
  },
  yAxis: {
  title: {
  text: ''
  }
  },
  series: [
  {
  name: 'Budget Annuel',
  type:'line',
  color:'#2E86C1',
  data: [100,250,280,300,500]
  },
  ],
  credits: {
  enabled:false,
  }
  });
 
  constructor(){}
 
  ngOnInit(): void {
 
  }
 }
