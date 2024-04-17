import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
/*import {TypeDemande} from "../../../types/typeDemande";
import {TypeDemandeService} from "../../../services/type-demande.service";*/
import {NbToastrService, NbWindowRef} from "@nebular/theme";
import {Observable} from "rxjs";
import { TypeDemande } from 'src/app/types/typeDemande';

@Component({
  selector: 'app-type-demandes-form',
  templateUrl: './type-demandes-form.component.html',
  styleUrls: ['./type-demandes-form.component.css']
})
export class TypeDemandesFormComponent implements OnInit {

  typeDemandeForm!: FormGroup;
  //typeDemandes: TypeDemande[]=[];
  @Input()
  refData:any;
  data: any;
  @Input()
  isEdit: boolean | undefined;
  constructor(private fb: FormBuilder,
              private toastr: NbToastrService,
              protected ref: NbWindowRef<TypeDemandesFormComponent>,) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getTypeDemandes();
  }
  getTypeDemandes(){
   /* this.typeDemandeService.getAll().subscribe((res)=>{
      this.typeDemandes=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }

  cancel() {
    this.ref.close();
  }


  initForm(){
    this.typeDemandeForm=this.fb.group({
      libelle: [this.refData?.libelle, [Validators.required,Validators.maxLength(255)]]
    })
  }

  submit(){
    if(this.typeDemandeForm.invalid){
      this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.typeDemandeForm.markAllAsTouched();
      return;
    }
    const dataForm=this.typeDemandeForm.value;
    const typeDemandeDto: TypeDemande={
      id: this.refData?.id,
      libelle: dataForm.libelle
    }
    /* const typeDemandeActions: Observable<TypeDemande>=this.isEdit?
      this.typeDemandeService.update(this.refData.id, typeDemandeDto):
      this.typeDemandeService.create(typeDemandeDto);
    typeDemandeActions.subscribe((res)=>{
      this.toastr.success("Type de demande ajoutée", "success");
      this.ref.close();
      location.reload()
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur "+err.status, {duration: 10000})
    })*/
  }

}
