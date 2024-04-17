import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Application} from "../../../types/application";
import {ApplicationService} from "../../../services/application.service";
import {NbToastrService, NbWindowRef} from "@nebular/theme";
import {Observable} from "rxjs";
import {RoleApplicatif} from "../../../types/role-applicatif";
import {DynamicFormService} from "../../../services/dynamic-form.service";
import {
  convertNodeSourceSpanToLoc
} from "@angular-eslint/template-parser/dist/template-parser/src/convert-source-span-to-loc";
import {ApplicationFormNameAndIdDTO} from "../../../types/application-form-name-id";
import {TypeDemandeService} from "../../../services/type-demande.service";
import {TypeDemande} from "../../../types/typeDemande";

@Component({
  selector: 'app-app-ref-form',
  templateUrl: './app-ref-form.component.html',
  styleUrls: ['./app-ref-form.component.css']
})
export class AppRefFormComponent implements OnInit {
  applicationForm!: FormGroup;
  file: any;
  applications: Application[]=[];
  @Input()
  refData:any;
  @Input()
  refType: any;
  @Input()
  selectedTd!:TypeDemande[]
  data: any;
  @Input()
  isEdit: boolean | undefined;
  typeDeDemandes !: TypeDemande[];
  listRoleApplicatif:RoleApplicatif[]=[]
  typeDeDemandeList:TypeDemande[]=[]
  templateId!:string
  selectedTypeDemandeIdsForEditForm: string[]=[];
  mettreAjourBtnDisabled: boolean=true;
  isChecked!: boolean;


  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService,
              private toastr: NbToastrService,
              protected ref: NbWindowRef<AppRefFormComponent>,
             private dfService:DynamicFormService,
              private tdService:TypeDemandeService) {
  }

  ngOnInit(): void {
    this.initForm();
    console.log('ref data ...................')
    console.log(this.refData)
    console.log('ref type ...................')
    console.log(this.refType)
    console.log('selectedTd  ...................')
    console.log(this.selectedTd)

   //console.log(this.refData.typeDeDemandeList.keys())

    if(this.isEdit){
      console.log('is edit value : '+this.isEdit)
      this.initEditForm();
      console.log('type demande from refData')
      console.log(this.refData.typeDeDemandeList)
      this.typeDeDemandeList=this.selectedTd;
    }
    this.getTypeDeDemandeList()

  }


  getTypeDeDemandeList(){

    this.tdService.getAll().subscribe({
      next: data=>{
        this.typeDeDemandes=data;
      },
      error:(err)=>console.log('errr')
    })

  }

  initEditForm(){
    this.applicationForm=this.fb.group({
      name: [this.refData?.name,[Validators.required,Validators.maxLength(255)]],
      description: [this.refData?.description,[Validators.required,Validators.maxLength(255)]],
      template:this.fb.control(this.selectedTypeDemandeIdsForEditForm,Validators.required),
      roleName:this.fb.control('',Validators.maxLength(255)),
      roleDescription:this.fb.control(this.refData?.roleDescription,Validators.maxLength(255))


    })
     this.selectedTd.forEach(td =>{
       if (td.id != null) {
         this.selectedTypeDemandeIdsForEditForm.push(td.id)
       }
     })

    this.listRoleApplicatif=this.refData.roleApplicatifList


  }
  getApplications(){
    this.applicationService.getAll().subscribe((res)=>{
      this.applications=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }

  cancel() {
    this.ref.close();
  }


  initForm(){
    this.applicationForm=this.fb.group({
      name: [null,[Validators.required,Validators.maxLength(255)]],
      description: [null,[Validators.required,Validators.maxLength(255)]],
      template:[null,Validators.required],
      roleName:[null,Validators.maxLength(255)],
      roleDescription:[null,Validators.maxLength(255)]
    })
  }


  updateApplication(){
    if(this.applicationForm.invalid){
      this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.applicationForm.markAllAsTouched();
      return;
    }
    const dataForm=this.applicationForm.value;
    const applicationDto: Application={
      id: this.refData?.id,
      name: dataForm.name,
      description: dataForm.description,

      //todo fill with appropriate data
      typeDemandeList:this.typeDeDemandeList,
      roleApplicatifList:this.listRoleApplicatif,

    }
    console.log('11111111111111111111111111111111111111111111111111111111')
    console.log(this.typeDeDemandeList)
    console.log('application dto :')
    console.log(applicationDto)
    const actions: Observable<Application>=
       this.applicationService.update(this.refData.id, applicationDto)
      actions.subscribe((res)=>{
        this.toastr.success("Application ajoutée", "success");
        this.ref.close();
        location.reload();
      },(err)=>{
        this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
      })

  }

  submit(){
    if(this.applicationForm.invalid){
      this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.applicationForm.markAllAsTouched();
      return;
    }
    const dataForm=this.applicationForm.value;
    const applicationDto: Application={
      id: this.refData?.id,
      name: dataForm.name,
      description: dataForm.description,

      //todo fill with appropriate data
      typeDemandeList:this.typeDeDemandeList,
      roleApplicatifList:this.listRoleApplicatif,

    }

    console.log('this is the request dto ')
    console.log( applicationDto)

    const actions: Observable<Application>=
     this.applicationService.create(applicationDto);
    actions.subscribe((res)=>{
      this.toastr.success("Application ajoutée", "success");
      this.ref.close();
      location.reload();
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })

  }

  addRole() {


    this.listRoleApplicatif.push({
      role_id:null,
      name:this.applicationForm.value.roleName,
      description:this.applicationForm.value.roleDescription
    })

    this.mettreAjourBtnDisabled=false
    console.log(this.applicationForm.value)
  }

  handelDeleteRole(index: number) {
    // delete role
    this.listRoleApplicatif.splice(index,1)
    this.mettreAjourBtnDisabled=false
  }

  handelAddTypeDeDemande(td:TypeDemande) {

    console.log(td)
    if (this.typeDeDemandeList.includes(td)){
      let tdIndex=this.typeDeDemandeList.indexOf(td)
      //delete from db the splice
      this.typeDeDemandeList.splice(tdIndex,1)
    }else {
      this.typeDeDemandeList.push(td)
    }


    this.mettreAjourBtnDisabled=false
    console.log('2222222222222222222222222222222222222222222222222222222222')
    console.log(this.typeDeDemandeList)
  }
}
