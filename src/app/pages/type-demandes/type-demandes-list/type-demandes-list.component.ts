import {Component, OnInit} from '@angular/core';
import {TypeDemande} from "../../../types/typeDemande";
import {Router} from "@angular/router";
import {NbDialogService, NbToastrService, NbWindowControlButtonsConfig, NbWindowService} from "@nebular/theme";
import {TypeDemandesFormComponent} from "../type-demandes-form/type-demandes-form.component";
import {DeleteConfirmDialogComponent} from "../../delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: 'app-type-demandes-list',
  templateUrl: './type-demandes-list.component.html',
  styleUrls: ['./type-demandes-list.component.css']
})
export class TypeDemandesListComponent implements OnInit {
  typeDemandes!: TypeDemande[];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  currentIndex = -1;

  constructor(private router: Router,
              private nbDialogService: NbDialogService,
              private nbWindowService: NbWindowService,
             // private typeDemandeService: TypeDemandeService,
              private toastr: NbToastrService) { }

  ngOnInit(): void {
    //this.getTypesDemandes()
  }

  open(e: any, isEdit: boolean){
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: true,
      close: true,
    };
    this.nbWindowService.open(TypeDemandesFormComponent, {title: "Ajouter un type", buttons: buttonsConfig, context: {refData: e, isEdit: isEdit}}, );
  }
  /*delete(e: any){
    this.nbDialogService.open(DeleteConfirmDialogComponent ).onClose.subscribe(res=>{
      if (res){
        this.typeDemandeService.delete(e.id).subscribe(()=>{
          this.toastr.success( "Template supprimé", "Success");
          location.reload();
        },(err: any)=>{
          if (err.error.message.includes("ConstraintViolationException")){
            this.toastr.danger("Ce type est déjà associé à des demandes. Vous ne pouvez pas le supprimer", "Erreur de suppression", {duration: 10000});
            return;
          }
          this.toastr.danger(err.error.message, "Erreur de suppression", {duration: 10000})
        })
      }
    });
  }*/

  /*getTypesDemandes(){
      this.typeDemandeService.getAll().subscribe((res)=>{
        this.typeDemandes=res;
      },(err)=>{
        this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
      })
  }*/
  handlePageChange(event: any): void {
    this.page = event;
    //this.getTypesDemandes();
  }

  handlePageSizeChange(value: any): void {
    this.pageSize = value;
    this.page = 1;
  }

  isMoreThanTen(){
    return this.typeDemandes?.length>=10
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
