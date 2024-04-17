import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as worldMapData from './worldMap.json';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  title = 'myangularproject';
  cities!: any;
  public titleOptions: object = {
    text: 'Moroccan Map'
  };

  public legendOptions: object = {
    visible: true
  };

  public layerOptions: object[] = [

    {
      dataLabelSettings: {
        visible: true,
        smartLabelMode: 'Trim'
      },
      tooltipSettings: {
        visible: true,
        valuePath: 'Country'
      },
      shapeData: worldMapData,
      shapePropertyPath: 'name',
      shapeDataPath: 'Country',
      shapeSettings: {
        colorValuePath: 'Membership',
        colorMapping: [{ value: 'Permanent', color: 'red' }],
        fill: 'red'
      },
      dataSource: [{ Country: 'Morocco', Membership: '',cities : [
        { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
        { name: 'Rabat', latitude: 34.0209, longitude: -6.8413 },
        { name: 'Fes', latitude: 34.0181, longitude: -5.0078 },
        { name: 'Marrakech', latitude: 31.6295, longitude: -7.9811 },
        { name: 'Tangier', latitude: 35.7595, longitude: -5.833 },
        { name: 'Agadir', latitude: 30.421, longitude: -9.5831 },
        { name: 'Meknes', latitude: 33.8926, longitude: -5.5428 },
        { name: 'Oujda', latitude: 34.6814, longitude: -1.9086 },
        { name: 'Kenitra', latitude: 34.261, longitude: -6.5802 },
        { name: 'Tetouan', latitude: 35.5748, longitude: -5.3728 }
      ]}]
    },
    {
      markerSettings: [
        {
          dataSource: [
            { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
            { name: 'Rabat', latitude: 34.0209, longitude: -6.8413 },
            { name: 'Fes', latitude: 34.0181, longitude: -5.0078 },
            { name: 'Marrakech', latitude: 31.6295, longitude: -7.9811 },
            { name: 'Tangier', latitude: 35.7595, longitude: -5.833 },
            { name: 'Agadir', latitude: 30.421, longitude: -9.5831 },
            { name: 'Meknes', latitude: 33.8926, longitude: -5.5428 },
            { name: 'Oujda', latitude: 34.6814, longitude: -1.9086 },
            { name: 'Kenitra', latitude: 34.261, longitude: -6.5802 },
            { name: 'Tetouan', latitude: 35.5748, longitude: -5.3728 }
          ],
          visible: true,
          shape: 'Circle',
          fill: '#ff0000',
          width: 10,
          height: 10
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.cities = [
      { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
      { name: 'Rabat', latitude: 34.0209, longitude: -6.8413 },
      { name: 'Fes', latitude: 34.0181, longitude: -5.0078 },
      { name: 'Marrakech', latitude: 31.6295, longitude: -7.9811 },
      { name: 'Tangier', latitude: 35.7595, longitude: -5.833 },
      { name: 'Agadir', latitude: 30.421, longitude: -9.5831 },
      { name: 'Meknes', latitude: 33.8926, longitude: -5.5428 },
      { name: 'Oujda', latitude: 34.6814, longitude: -1.9086 },
      { name: 'Kenitra', latitude: 34.261, longitude: -6.5802 },
      { name: 'Tetouan', latitude: 35.5748, longitude: -5.3728 }
    ];

    console.log(this.cities);
  }
}
