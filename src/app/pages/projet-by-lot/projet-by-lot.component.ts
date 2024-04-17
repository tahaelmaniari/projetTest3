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
  'Janv',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre'
  ]
  },
  yAxis: {
  title: {
  text: ''
  }
  },
  series: [
  {
  name: 'Projet 1',
  type:'line',
  color:'#2E86C1',
  data: [1,2,3,4,5,6,7,8,9,10,11,12]
  },
  {
  name: 'Projet 2',
  type:'line',
  color:'#A569BD',
  data: [1,4,5,10,11,6,6]
  },
  {
  name: 'Projet 3',
  type:'line',
  color:'#34495E',
  data: [1,1,1,6,6,7,7,9,12,12]
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
