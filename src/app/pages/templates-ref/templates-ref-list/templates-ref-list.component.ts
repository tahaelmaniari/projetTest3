import {Component, OnInit} from '@angular/core';
import {Template} from "../../../types/template";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {NbDialogService, NbToastrService, NbWindowControlButtonsConfig, NbWindowService} from "@nebular/theme";
import {TemplatesRefFormComponent} from "../templates-ref-form/templates-ref-form.component";
import {DeleteConfirmDialogComponent} from "../../delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: 'app-templates-ref-list',
  templateUrl: './templates-ref-list.component.html',
  styleUrls: ['./templates-ref-list.component.css']
})
export class TemplatesRefListComponent implements OnInit {

  templates!: Template[];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  currentIndex = -1;

  constructor(private router: Router,
              private nbDialogService: NbDialogService,
              private nbWindowService: NbWindowService,
              private toastr: NbToastrService) { }

  ngOnInit(): void {
   // this.getTemplates();

  }

 /* getTemplates(){
    const params=this.getRequestParams(this.page, this.pageSize)
    this.templateService.getPageable(params).subscribe(({templates, totalItems})=>{
      this.templates=templates;
      this.count=totalItems;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }*/

  open(e: any, isEdit: boolean){
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: true,
      close: true,
    };
    this.nbWindowService.open(TemplatesRefFormComponent, {title: "Ajouter un model", buttons: buttonsConfig, context: {refData: e, isEdit: isEdit}}, );
  }

  /*delete(e: any){
    this.nbDialogService.open(DeleteConfirmDialogComponent ).onClose.subscribe(res=>{
      if (res){
        this.templateService.delete(e.id).subscribe(()=>{
          this.toastr.success( "Template supprimé", "Success");
          location.reload();
        },(err: any)=>{
          this.toastr.danger(err.error.message, "Erreur de suppression", {duration: 10000})
        })
      }
    });
  }*/
  handlePageChange(event: any): void {
    this.page = event;
    //this.getTemplates();
  }

  handlePageSizeChange(value: any): void {
    this.pageSize = value;
    this.page = 1;
    //this.getTemplates();
  }

  isMoreThanTen(){
    return this.templates?.length>=10
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
