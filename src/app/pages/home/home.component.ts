import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Request} from "../../types/request";
import {Application} from "../../types/application";
import {TypeDemande} from "../../types/typeDemande";
import {NbCalendarRange, NbDateService, NbIconLibraries, NbToastrService} from "@nebular/theme";
import {UserService} from "../../services/user.service";
import {Chart} from "chart.js/auto";
import { faClock, faCoffee, faMoneyBill, faMoneyCheckDollar, faProjectDiagram, faTachometerAltAverage, faTachometerAverage } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  faCofee = faCoffee

  faMoney = faMoneyBill
  faTime = faClock
  faMoneyEstimation = faMoneyCheckDollar
  average = faProjectDiagram
  range: NbCalendarRange<Date> = {
    start: this.monthStart,
    end: this.monthEnd,
  };
  requests!: Request[];
  type: string = 'Mois';
  types: string[] = ['Mois','Année'];

  allTypeDemande: TypeDemande={
    libelle: "tout"
  }
  selectedType: TypeDemande=this.allTypeDemande;
  allApplications: Application={

    name: "tout",
    description: "",

    typeDemandeList:[],
    roleApplicatifList:[]

  }
  selectedApplication: Application=this.allApplications;
  applications: Application[]=[];
  typeDemandes: TypeDemande[]=[];
  periods=["Mois", "Année"]
  selectedPeriod = ["Mois"];
  params!: any;
  data!: any;
  profile!: any;
  @ViewChild('myLineChart')
  chartElementRef !: ElementRef<HTMLCanvasElement>;


  constructor(private cd: ChangeDetectorRef,
              private dateService: NbDateService<Date>,
              private toastr: NbToastrService,
              private userService: UserService,
            private iconLibrairies : NbIconLibraries
            ) {
              this.iconLibrairies.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
              this.iconLibrairies.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
              this.iconLibrairies.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
              this.iconLibrairies.setDefaultPack('fas')
  }
  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  getYearStart(): Date {
    return this.dateService.getYearStart(new Date());
  }
  getYearEnd(): Date {
    return this.dateService.getYearEnd(new Date())

  }

  ngOnInit(): void {
    this.renderBar()
  }

  onChange(range: any){
    this.range=range;
    this.loadAllRequests()
  }
  updateSingleSelectGroupValue(value: any): void {
    this.selectedPeriod = value;
    if(value=='Mois'){
      this.range={
        start: this.monthStart,
        end: this.monthEnd
      }
    } else if(value=='Année'){
      this.range={
        start: this.getYearStart(),
        end: this.getYearEnd()
      }
    }
    this.loadAllRequests();
    this.cd.markForCheck();
  }

  loadAllRequests(e?: string){
    const request: {
      typeDemande?: TypeDemande;
      application?: Application;
      from?: Date;
      to?: Date;
      initiator: {
        id: string
      }
    }={
      from: this.range.start,
      to: this.range.end,
      initiator: {
        id: this.profile.userId
      }
    }
    if (this.selectedType?.libelle!=='tout'){
      request.typeDemande=this.selectedType;
    }
    if (this.selectedApplication?.name!=='tout'){
      request.application=this.selectedApplication;
    }

    // this.requestService.getPilotageData(request).subscribe((res)=>{
      // this.data=res;
    // },(err)=>{
      // this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    // })
  }
  getApplications(){
    // this.applicationService.getAll().subscribe((res)=>{
      // this.applications=res;
    // },(err)=>{
      // this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    // })
  }
  getTypeDemandes(){
    // this.typeDemandeService.getAll().subscribe((res)=>{
      // this.typeDemandes=res;
    // },(err)=>{
      // this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    // })
  }
  changePeriod(period: string): void {
    this.type = period;
  }

  trackByDate(_: any, item: Request) {
    return item.initiationDate;
  }


  renderBar(){
    var myBChart = new Chart("myBarChart", {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar', 'April', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Demande Valider',
          data: [12,7,17, 15, 3, 12, 7, 6,17, 15, 3, 12, 7, 6],
          backgroundColor: [

            'rgb(89,139,255,1)'




          ],
        },
          {
            label: 'Demande Rejeter',
            data: [25,33,47, 15, 30, 18, 27, 9,47, 15, 30, 18, 27, 9],
            backgroundColor: [

              'rgb(255,61,113,1)'

            ],
          },
          {
            label: 'Demande Approuver',
            data: [6,11,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3],
            backgroundColor: [

              'rgb(44,230,155,1)'


            ],

          },
     ]
      },
      options: {
        responsive:true,

        plugins:{
          legend:{
            position:"top",
            align:"end"
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid:{
              display:false
            },
            ticks: {

              stepSize: 10
            }
          },

          y: {
            beginAtZero: true,
            grid:{
              display:true
            },
            ticks: {

              stepSize: 10
            }
          }
        }
      }
    });

  }
}
