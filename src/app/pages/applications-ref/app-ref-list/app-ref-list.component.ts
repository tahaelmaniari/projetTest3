import {Component, OnInit} from '@angular/core';
import {Application} from "../../../types/application";
import {Router} from "@angular/router";
import {NbDialogService, NbToastrService, NbWindowControlButtonsConfig, NbWindowService} from "@nebular/theme";
import {ApplicationService} from "../../../services/application.service";
import {AppRefFormComponent} from "../app-ref-form/app-ref-form.component";
import {DeleteConfirmDialogComponent} from "../../delete-confirm-dialog/delete-confirm-dialog.component";
import {TypeDemande} from "../../../types/typeDemande";

@Component({
  selector: 'app-app-ref-list',
  templateUrl: './app-ref-list.component.html',
  styleUrls: ['./app-ref-list.component.css']
})
export class AppRefListComponent implements OnInit {
  applications!: Application[];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  currentIndex = -1;
  name: string="";
  description: string="";

  constructor(private router: Router,
              private nbDialogService: NbDialogService,
              private nbWindowService: NbWindowService,
              private applicationService: ApplicationService,
              private toastr: NbToastrService) { }

  getAllApps(page: number){
    this.page=page;
    const application: Application={
      description: this.description,
      name: this.name,


      typeDemandeList:[],
      roleApplicatifList:[]

    }
    const params=this.getRequestParams(this.page, this.pageSize);
    this.applicationService.search(params, application).subscribe((res)=>{
      this.applications=res.applications;
      this.count=res.totalItems;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }

  ngOnInit(): void {
    this.getAllApps(1)
  }

  open(selectedTypeDemande:TypeDemande[], e: any, isEdit: boolean){
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: true,
      close: true,
    };
    this.nbWindowService.open(AppRefFormComponent, {title: !isEdit?"Ajouter une application":"Modifier une application", buttons: buttonsConfig, context: { selectedTd:selectedTypeDemande ,refData: e, isEdit: isEdit}}, );
  }

  delete(e: any){
    this.nbDialogService.open(DeleteConfirmDialogComponent ).onClose.subscribe(res=>{
      if (res){
        this.applicationService.delete(e.id).subscribe(()=>{
          this.toastr.success( "Applications supprimée", "Success");
          location.reload();
        },(err: any)=>{
          if (err.error.message.includes("ConstraintViolationException")){
            this.toastr.danger("Cette application est associée à une demande. Vous ne pouvez pas le supprimer", "Erreur de suppression", {duration: 10000});
            return;
          }
          this.toastr.danger(err.error.message, "Erreur de suppression", {duration: 10000})
        })
      }
    });
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getAllApps(this.page);
  }

  handlePageSizeChange(value: any): void {
    this.pageSize = value;
    this.page = 1;
    this.getAllApps(this.page);
  }

  isMoreThanTen(){
    return this.applications?.length>=10
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

}
