import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Template} from "../../../types/template";
import {TypeDemande} from "../../../types/typeDemande";
import {Application} from "../../../types/application";
import {NbToastrService, NbWindowRef} from "@nebular/theme";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-templates-ref-form',
  templateUrl: './templates-ref-form.component.html',
  styleUrls: ['./templates-ref-form.component.css']
})
export class TemplatesRefFormComponent implements OnInit {
  //baseUrl: string=environment.baseUrl
  templateForm!: FormGroup;
  file: any;
  templates: Template[]=[];
  typeDemandes: TypeDemande[]=[];
  applications: Application[]=[];
  @Input()
  refData!:Template;
  data: any;
  @Input()
  isEdit!: boolean;
  constructor(private fb: FormBuilder,
              private toastr: NbToastrService,
              protected ref: NbWindowRef<TemplatesRefFormComponent>,) {
  }

  ngOnInit(): void {
    /*this.getTemplates();
    this.getTypeDemandes();
    this.getApplications();*/
    this.initForm();
  }
  initForm(){
    this.templateForm=this.fb.group({
      name: [this.refData?.name, Validators.required],
      typeDemande: [this.refData?.typeDemandes, Validators.required],
      attachment: [null, Validators.required],
      application: [this.refData?.applications, Validators.required]
    })
  }

 /*getTemplates(){
    this.templateService.getAll().subscribe((res)=>{
      this.templates=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    });
  }*/

  /*getTypeDemandes(){
    this.typeDemandeService.getAll().subscribe((res)=>{
      this.typeDemandes=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }*/

  /*getApplications(){
    this.applicationService.getAll().subscribe((res)=>{
      this.applications=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }*/

  cancel() {
    this.ref.close();
  }

  handleFileInput(e: any) {
    this.file = e.target.files[0];
  }

  submit(){
    if(this.templateForm.invalid){
      this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.templateForm.markAllAsTouched();
      return;
    }
    const dataForm=this.templateForm.value;
      if(!this.file){
        this.toastr.danger('Veuillez joindre le formulaire de demande', 'Formulaire invalide');
        return;
      }
      const templateDto: Template={
        id: this.refData.id,
        name: dataForm.name,
        typeDemandes: dataForm.typeDemande,
        applications: dataForm.application
      }
     /* const templateActions: Observable<Template>=
        this.isEdit?this.templateService.update(this.refData.id, templateDto, this.file):this.templateService.create(templateDto, this.file);
      templateActions.subscribe((res)=>{
        this.toastr.success("Formulaire enregistrée avec succès", "Succès");
        this.initForm();
        this.file=null;
        this.ref.close();
        location.reload()
      }, (err)=>{
        this.toastr.danger(err.error.message, "Erreur "+err.status, {duration: 10000})
      })*/
  }


}
