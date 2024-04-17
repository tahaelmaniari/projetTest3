import {Component, Input, OnInit} from '@angular/core';
import {Request} from "../../../types/request";
import {Criteria} from "../../../types/criteria";
import {TypeDemande} from "../../../types/typeDemande";
import {Application} from "../../../types/application";
import {RequestPage} from "../../../types/requestPage";
import {NbToastrService} from "@nebular/theme";
import {NbCalendarRange} from "@nebular/theme/components/calendar/calendar-range.component";
/*import  Papa from "papaparse";
import downloadjs from "downloadjs";*/
@Component({
  selector: 'app-request-smart-table',
  templateUrl: './request-smart-table.component.html',
  styleUrls: ['./request-smart-table.component.css']
})
export class RequestSmartTableComponent implements OnInit {
  loading: boolean=false;
  @Input() criteria!: Criteria;
  typeDemandes: TypeDemande[]=[];
  applications: Application[]=[];
  typeDemande!: TypeDemande;
  application!: Application
  initiationDate!: NbCalendarRange<any>;
  closeDate!: Date;
  profile: any;
  status!: string;
  //todo add status here
  statuss: string[]=["A approuver validateur", "A approuver RH", "A completer", "Cloturée", "Rejetée", "Retirée"]
  currentIndex = -1;
  isOnePage!: boolean;
  source: Request[]=[];
  requestPage!: RequestPage;
  matriculeInitiator: string='';
  matriculeAssignee: string='';
  assigneeName: string='';
  initiatorName: string='';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];


  constructor(private toastr: NbToastrService) { }

  ngOnInit(): void {
    this.getTypeDemandes();
    this.getApplications();

    //todo change here too
    this.statuss=this.criteria.status?.includes('tout')?this.statuss:
      this.criteria.status?.includes('En cours')?
        ["A approuver validateur", "A approuver RH", "A completer"]:this.criteria.status;
    //this.profile=this.userService.getUserProfile();

    this.loadRequestsByCriteria(this.page);
  }

  loadRequestsByCriteria(page: number) {
    this.loading=true;
    this.page=page;
    const  status: string[]=[];
    if (this.criteria?.status){
      this.criteria.status?.forEach(s=>{
        status.push(s);
      })
    }
    if (this.status!=null){
      status.push(this.status)
    }

    console.log(" ///////////////////////")
    console.log(status)
    const criteria: Criteria = {
      typeDemande: this.typeDemande,
      application: this.application,
      initiationFrom: this.initiationDate?.start,
      initiationTo: this.initiationDate?.end,
      closeDate: this.closeDate,
      // @ts-ignore
      status: status,
      searcher: this.profile.userId,
      initiator: this.criteria?.initiator,
      assigneeFirstName: this.assigneeName.split(' ')[0],
      assigneeLastName: this.assigneeName.split(' ')[1],
      initiatorFirstName: this.initiatorName.split(' ')[0],
      initiatorLastName: this.initiatorName.split(' ')[1]
    }
    console.log(page, this.page)
    const params = this.getRequestParams(page, this.pageSize);

    console.log('params----------------------------')
    console.log(criteria)
    /*this.requestService.search(criteria, params).subscribe((res) => {
      this.loading=false;
      this.requestPage = res;
      this.source = this.requestPage.requests
      console.log('source--------------------------')
      console.log(res.requests)
      this.count = this.requestPage.totalItems;
      this.isOnePage = this.count <= this.pageSize;
    }, (err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }

  getMyRequests(e: any){
    console.log(e)
      this.assigneeName=e?this.profile.firstName+' '+this.profile.lastName:''

    this.loadRequestsByCriteria(1)
  }

  getTypeDemandes(){
   /* this.typeDemandeService.getAll().subscribe(res=>{
      this.typeDemandes=res;
    }, (err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }
  getApplications(){
   /* this.applicationService.getAll().subscribe(res=>{
      this.applications=res;
    }, (err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.loadRequestsByCriteria(this.page);
  }

  handlePageSizeChange(value: any): void {
    this.pageSize = value;
    this.page = 1;
    this.loadRequestsByCriteria(this.page);
  }

  isMoreThanTen(){
    return this.source?.length>=10
  }

  getRequestParams(page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};


    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  isFinalState(){
    return this.status==="Cloturée" || this.status==="Retirée" || this.status==="Rejetée"
  }

  onDownloadCSV() {
    const settings= [
      {key: "applicationName", title: "Application"},
      {key: "typeDemandeLibelle", title: "Type de demande"},
      {key: "initiatorName", title: "Initiateur"},
      {key: "assigneeName", title: "Affectée à"},
      {key: "initiationDate", title: "Date de la demande"},
      {key: "status", title: "Status"},
      {key: "closeDate", title: "Date de fin"},
    ]
    const  data=this.source.map((r: any) => {
      r.applicationName=r.application.name;
      r.typeDemandeLibelle=r.typeDemande.libelle;
      r.assigneeName= r.assignee?(r.assignee?.firstName+' '+r.assignee?.lastName):"";
      r.initiatorName=r.initiator?.firstName+' '+r.initiator?.lastName;
      return r;
    });
    console.log(this.source);
    this.downloadCSV(this.mapDataToTable(data, settings));
  }
  mapDataToTable(data: any[], columns: any[]) {
    const tableHeaders = columns.map(column => column.title);
    const tableData = data.map(row => {
      return columns.map(column => (row[column.key]));
    });

    return [tableHeaders, ...tableData];
  }
  downloadCSV(data: any) {
    if (window["Uint8Array"]) {
      const fileName = this.getDocumentTitle().concat(".csv");
      //const csvData = Papa.unparse(data, { delimiter: ";", quotes: true });
      //downloadjs(csvData, fileName, "text/plain");
    } else {
      alert(
        `Cette fonctionnalité n'est pas disponible sur votre navigateur!`
      );
    }
  }

  getDocumentTitle() {
    return "Téléchargement-" + Date.now();
  }

}
