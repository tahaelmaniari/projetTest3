import { Component, Input, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: 'app-evolution-projet-lot',
  templateUrl: './evolution-projet-lot.component.html',
  styleUrls: ['./evolution-projet-lot.component.css']
})

export class EvolutionProjetLotComponent implements OnInit{
  public chart : any
  public clickedValues: string[] = []; // Tableau pour stocker les valeurs du graphique cliqué
  nombreFournisseur!: any
  projetSelected !: any
  typeFournisseur : any
  nb : any;


  constructor() { }
  ngOnInit(): void {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Projet 1', 'Projet 2', 'Projet 3'], 
         datasets: [
          {
            label: "Mieux Disant",
            data: ['5','4','5','7'],
            backgroundColor: '#58D68D',
          },
          {
            label: "Moins Disant",
            data: ['4','5','4'],
            backgroundColor:  '#2E86C1',
            
          },
        ]
      },
      options: {
        aspectRatio:1.5,
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const clickedElement = elements[0];
            // Vérifier si l'indice du jeu de données est défini
            if (clickedElement.datasetIndex !== undefined) {
              const datasetIndex = clickedElement.datasetIndex;
              const dataIndex = clickedElement.index;
               this.nombreFournisseur = this.chart.data.datasets[datasetIndex].data[dataIndex];
               this.projetSelected = this.chart.data.labels[dataIndex];
               this.typeFournisseur = this.chart.data.datasets[datasetIndex].label;
               this.nb = Array.from({length: this.nombreFournisseur}, (_, index) => index + 1);
               console.log(this.nombreFournisseur ,' fournisseurs ',this.typeFournisseur,' pour le ',this.projetSelected);
              console.log(this.nb)
            } else {
              console.log("L'élément cliqué n'appartient à aucun jeu de données.");
            }
          }
        }
      }
      
    });
  }
  
  }


