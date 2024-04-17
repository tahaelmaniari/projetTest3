import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'gh-linechart3',
  templateUrl: './linechart3.component.html',
  styleUrls: ['./linechart3.component.scss']
})
export class Linechart3Component implements OnInit,AfterViewInit {
  constructor() { }
  @ViewChild('myLineChart3')
  chartElementRef3 !: ElementRef<HTMLCanvasElement>;
  @Input()
  gradient!:string[]


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //const ctx=this.chartElementRef3.nativeElement.getContext('2d')
    const canvas=<HTMLCanvasElement>document.getElementById('myLineChart3');
    const ctx=canvas.getContext('2d')
    const gradient =ctx?.createLinearGradient(0,0,20, 300)
    this.gradient.forEach((color,index)=>{
      gradient?.addColorStop(index, color)
    })

    this.renderLine(11,3,4,15,6,10,9,ctx,gradient)

  }
  renderLine(day1: number, day2: number, day3: number, day4: number, day5: number, day6: number, day7: number, ctx: any, gradient: CanvasGradient | undefined){



    //to replace the labels
    var myLChart = new Chart("myLineChart3", {

      type: 'line',

      data: {
        /*       labels: [
                 new Date(new Date().setDate(new Date().getDate()-6)).getDate().toString(),
                 new Date(new Date().setDate(new Date().getDate()-5)).getDate().toString(),
                 new Date(new Date().setDate(new Date().getDate()-4)).getDate().toString(),
                 new Date(new Date().setDate(new Date().getDate()-3)).getDate().toString(),
                 new Date(new Date().setDate(new Date().getDate()-2)).getDate().toString(),
                 new Date(new Date().setDate(new Date().getDate()-1)).getDate().toString(),
                 new Date().getDate().toString()
               ],*/
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7'
        ],
        datasets: [{
          label: 'Nb Demandes Par Jour',
          /*  data: [day1.toString(), day2.toString(), day3.toString(), day4.toString(), day5.toString(), day6.toString(),day7.toString()],*/
          data:[day1.toString(),day2.toString(),day3.toString(),day4.toString(),day5.toString(),day6.toString(),day7.toString()],
          tension: 0.3,

          fill: true,

          backgroundColor:gradient,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{
            display:false,
            position:"top",
            align:"end"
          }
        },
        scales: {
          x: {
            display:false,
            beginAtZero: true,
            grid:{
              display:false,

            },
            ticks: {
              // forces step size to be 50 units
              stepSize: 100
            }
          },
          y: {
            display:false,
            beginAtZero: true,
            grid:{
              display:false,

            },
            ticks: {
              // forces step size to be 50 units
              stepSize: 1
            }
          }
        }
      }
    });

  }
}
