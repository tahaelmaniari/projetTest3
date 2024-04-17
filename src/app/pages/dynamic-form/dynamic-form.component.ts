import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormTemplate, Validator} from "../../types/form-template";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {DynamicFormService} from "../../services/dynamic-form.service";
import {ApplicationService} from "../../services/application.service";
import { v4 as uuid } from 'uuid';
import {NbToastrService, NbWindowService} from "@nebular/theme";

import {Application} from "../../types/application";
import {catchError, map, Observable, of} from "rxjs";
import {CompleterData, CompleterService} from "ng2-completer";
import {TypeDemandeService} from "../../services/type-demande.service";
import {TypeDemande} from "../../types/typeDemande";
import {ApplicationFormNameAndIdDTO} from "../../types/application-form-name-id";
import {DeleteConfirmDialogComponent} from "../delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: 'gh-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  createMode: boolean=false;
  editMode:boolean=false
  viewMode:boolean=false
  fieldForEditMode!: FormTemplate;
  indexForEditMode !: number ;
  addFieldOnEditMode!:boolean
  constructor(private fb:FormBuilder,
              private dfService:DynamicFormService,
              private completerService: CompleterService,
              private toastr: NbToastrService,
              private applicationService: ApplicationService ,
              private typeDemandeService: TypeDemandeService,
              private cdr : ChangeDetectorRef,
              private windowService:NbWindowService) { }



  /*  Form groups */

  genFormGroup!:FormGroup
  createTemplateFormGroup!:FormGroup

  /*  Booleans */

  isSelected !:boolean
  saveTemplateActive:boolean=true
  activateFieldTableDisabled: boolean = true;
  addFieledInEditDisabled: boolean=true;
  activateCreationMode!: boolean;
  createModeBtnHidden:boolean = false
  initTemplateBtnHidden :boolean = false
  formParameterCardHidden :boolean = true

  /*  Unused attributes */

  //bindValue: boolean=false;
  //selectedAppId:string=''
  //allApplicationsSelected !:Application[]
  //disableApplicationList: boolean=true;


  /*  Application related  */

  filterApps!: Observable<Application[]>;
  selectedApplication !:Application[]
  applications: Application[]=[];
  applicationListForTemplate:Application[]=[]
  templateNamesAndIds!:ApplicationFormNameAndIdDTO[]
  ignoredAppsForCheck:String[]=[]

  /*  Type demande related  */

  typeDemandes!: TypeDemande[];

  /*  String related  */

  templateName !:string
  templateIdentifier!:string
  typeDemandeForTemplate!:string
  applicationIdsListForEditModeDisplay:String[]=[]

  /*  Form feild related  */

  formFields !: FormTemplate[]
  newTemplateFieldList : FormTemplate[] =[]

  dataService!: CompleterData;


  /*  Pagination  */

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  currentIndex = -1;



  ngOnInit(): void {
    this.initCreateTemplateFormGroup()

    this.genFormGroup =this.fb.group(
      {}
    )

   /* console.log(' filed list lenght : '+this.newTemplateFieldList.length)*/

    this.getApplications();
    this.getTypesDemandes()
    this.handelGetAllTemplates()


  }



  /*  **************************** Utility  functions ***************************  */
  handelPreviewform(newFeildList:FormTemplate[]) {

    console.log(newFeildList)
    newFeildList.forEach(f=>{

      let validatorList :  ValidatorFn[] = []

      f.validators.forEach(v => {

        switch (true) {
          case (v.valType === 'required'):

            validatorList.push(Validators.required)
            break;
          case (v.valType === 'minLenght'):

            validatorList.push(Validators.minLength(v.valValue))
            break;
          case (v.valType === 'pattern'):

            validatorList.push(Validators.pattern(v.valValue))
            break;
          case (v.valType === 'min'):

            validatorList.push(Validators.minLength(v.valValue))
            break;
          case (v.valType === 'max'):

            validatorList.push(Validators.max(v.valValue))
            break;
          case  (v.valType === 'maxLength'):
            validatorList.push(Validators.maxLength(v.valValue))
            break;
        }

      })
      this.genFormGroup.addControl(f.formCtlName,new FormControl('',validatorList))

    })


    this.formFields=this.newTemplateFieldList.sort((a,b)=>{

      // @ts-ignore
      if(a.index > b.index){
        return 1
        // @ts-ignore
      }else if(a.index < b.index){
        return -1
      }

      return  0
    });


  }

  initCreateTemplateFormGroup(){
    this.createTemplateFormGroup=this.fb.group({
      templateName:this.fb.control(this.templateName,Validators.compose([Validators.maxLength(255),Validators.required])),
      application:this.fb.control(this.applicationIdsListForEditModeDisplay,Validators.required),
      typeDemnade:this.fb.control(this.typeDemandeForTemplate,Validators.required),

    })
    //console.log(this.newTemplateFieldList)
  }
  handelViewTemplate(templateID: string) {

    this.editMode = false
    this.createMode =false
    this.formParameterCardHidden=true
    this.initTemplateBtnHidden=true
    this.createTemplateFormGroup.disable()

    this.dfService.getTemplateById(templateID).subscribe({
      next:data=> {
        this.fillFormWithValuesFromDb(data)
        this.initCreateTemplateFormGroup()
        this.handelPreviewform(this.newTemplateFieldList)

      },
      error:(err)=>this.toastr.danger('erreur de chargement de la template', "Error", {duration: 10000})
    })
  }


  toggleActivateModes(creationMode:boolean,editMode:boolean,viewMode:boolean){
      this.createMode=creationMode
      this.editMode=editMode
      this.viewMode=viewMode
  }
  toggleShowButtons(){}
  toggleDisableControles(){}
  toggleShowElement(){}

  /*  **************************** Set Value  functions ***************************  */

  handelActivateMajBtn() {
    this.saveTemplateActive=false
  }
  handelActivateCreateMode() {
    this.activateCreationMode=true
    this.editMode=false
    location.reload()
  }
  setTypeDemandeForTemplate(td :TypeDemande){
    if (td.id != null) {
      this.typeDemandeForTemplate = td.id
    }

    console.log('ignoredd application ids 3')
    console.log(this.ignoredAppsForCheck)
    //todo try to refactore to a function

    // @ts-ignore
    if (this.typeDemandeForTemplate && this.selectedApplication[this.selectedApplication.length-1].id ){
      console.log('********************selected application ************************')
      console.log(this.selectedApplication)
      this.selectedApplication.forEach((a,index)=>{

        // @ts-ignore
          if (!this.ignoredAppsForCheck.includes(a.id)){
            // @ts-ignore
            this.dfService.listTdAssociatedWithAppId(a.id,this.typeDemandeForTemplate).subscribe({
              next:res=>{
                console.log(res)
              },
              error:(err)=>{
                this.toastr.danger(err.error.message, "Error", {duration: 10000})
                if (err.error.message.includes('dèjà associer')){

                  // @ts-ignore
                let elementIndex = this.selectedApplication.indexOf(a);
                  // @ts-ignore
                  console.log(a.id)
                  this.selectedApplication=[...this.selectedApplication.slice(0,elementIndex),...this.selectedApplication.slice((elementIndex+1))]
                }
              }
            })
        }


      })

    }

  }

  handelActivateSaveTemplateBtn(boolFlag: boolean) {

    // todo working but needs some refactoring
    if(this.newTemplateFieldList.length === 0){
    }
    this.newTemplateFieldList.forEach(f =>{
      if (f.formCtlName === null || f.formCtlName === undefined  ){
      }else {
        this.saveTemplateActive=boolFlag
      }
    })

  }
  fillFormWithValuesFromDb(formTemplate:FormTemplate[]){
    this.templateName=formTemplate[0].templateNm
    this.typeDemandeForTemplate=formTemplate[0].typeDemandeId
    this.newTemplateFieldList=formTemplate

/*    console.log('..........................................')
    console.log(formTemplate)
    console.log('..........................................')
    console.log(this.newTemplateFieldList)
    console.log('..........................................')*/

    // Init Array
    this.applicationIdsListForEditModeDisplay=[]

    // Init Array
    this.ignoredAppsForCheck=[]
    formTemplate[0].applicationList.forEach( (app:any) =>{
      this.applicationIdsListForEditModeDisplay.push(app.name)
      this.ignoredAppsForCheck.push(app.id)

    })
    console.log('ignoredd application ids')
    console.log(this.ignoredAppsForCheck)
   /* console.log('all data set from fillFormWithValuesFromDb methode :')
    console.log(this.newTemplateFieldList)*/
  }


  /*  **************************** Get data functions   ***************************  */

  getTypesDemandes(){
    this.typeDemandeService.getAll().subscribe((res)=>{
      this.typeDemandes=res;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }
  getApplications(){
    this.applicationService.getAll().subscribe((res)=>{
      this.filterApps=of(res);
      this.applications=res;
      this.dataService = this.completerService.local(this.applications, 'name', 'name');
    });
  }
  handelGetAllTemplates(){
    this.dfService.getAlltemplateNames().subscribe({
      next:data=>{
       /* console.log(data)*/
        this.templateNamesAndIds=data.filter(
          (obj, index) =>
            data.findIndex((item) => item.templateID === obj.templateID) === index
        );
      },
      error:(err)=>this.toastr.danger('erreur de chargement  appName and Ids', "Error", {duration: 10000})
    })
  }


  /*  ****************************  Template Related  ***************************  */
  handelCreateTemplate() {

    this.templateName=this.createTemplateFormGroup.controls['templateName'].value
    this.templateIdentifier=uuid();

    if(this.createTemplateFormGroup.invalid ||this.templateName === '' || this.templateName === undefined || this.templateName.match('^\\s*$')){

      this.toastr.danger('Template : '+this.templateName+' Is not valid Please fill all required fileds ', "Error", {duration: 10000})
    }else {
      this.toastr.success('Template : '+this.templateName+' Initialised successfully  ', "Sucess", {duration: 10000})

      // Init Array
      this.newTemplateFieldList=[]
      this.handelPreviewform(this.newTemplateFieldList)
      this.activateFieldTableDisabled=false
      this.createMode=true
      this.activateCreationMode=true
      this.editMode=false
      this.formParameterCardHidden=false
      this.createTemplateFormGroup.disable()

    }

  }
  handelSaveTemplate() {

 /*   console.log(this.newTemplateFieldList)*/

    this.editMode=false
    this.newTemplateFieldList.forEach(f=>{
      f.typeDemandeId=this.typeDemandeForTemplate
      f.applicationList=this.selectedApplication
      }
    )
    this.dfService.saveTemplate(this.newTemplateFieldList).subscribe({
      next:data=>{
        this.toastr.success('Template : '+this.templateName+' saved successfully  ', "Sucess", {duration: 10000})
        location.reload()
      },
      error:(err)=>this.toastr.danger('template vide ne peut pas être enregistrer , ajoutez un champ pour continuer', "Erreur", {duration: 10000})

    })



  }
  handelAddApplication(selectedApplication:Application[]) {

    console.log('ignoredd application ids 2')
    console.log(this.ignoredAppsForCheck)
    if (this.editMode){
      this.applicationListForTemplate=selectedApplication
    }

  /*    console.log('selected application .....................')
    console.log(selectedApplication)
    console.log('applicationListForTemplate .....................')
    console.log(this.applicationListForTemplate)*/

    this.saveTemplateActive=false
    // push the last application added to the array because you don't want to push a previous app that would already be there
    this.applicationListForTemplate.push(selectedApplication[selectedApplication.length-1])

  /*   console.log(this.applicationListForTemplate)
    console.log("ids OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    console.log('app id :'+this.selectedApplication[this.selectedApplication.length-1].id+'type demande id :'+this.typeDemandeForTemplate)*/

    // @ts-ignore
    if(selectedApplication && this.typeDemandeForTemplate && !this.ignoredAppsForCheck.includes(this.selectedApplication[this.selectedApplication.length-1].id)){
      // @ts-ignore
      this.dfService.listTdAssociatedWithAppId(this.selectedApplication[this.selectedApplication.length-1].id,this.typeDemandeForTemplate).subscribe({
        next:res=>{
          console.log(res)
        },
        error:(err)=>{
          this.toastr.danger(err.error.message, "Error", {duration: 10000})

          let selectedApplicationIndex=this.selectedApplication.indexOf(selectedApplication[selectedApplication.length-1])
          console.log('selected application index '+selectedApplicationIndex)

          if (selectedApplicationIndex == this.selectedApplication.length){

            this.selectedApplication=[...this.selectedApplication.slice(0,selectedApplicationIndex)]

          }else {

            // todo logicly it should only ...this.selectedApplication.slice(selectedApplicationIndex+1)
            //  since it doubles the last element i patched it up but this has to be cleaned


            this.selectedApplication=[...this.selectedApplication.slice(0,selectedApplicationIndex),...this.selectedApplication.slice(selectedApplicationIndex+2)]
          }


        }
      })
    }


  }

  handelUpdateTemplateOnDb() {

/*    console.log('list of application list for template **************************** ')
    console.log(this.applicationListForTemplate)*/

    this.applicationListForTemplate=[...new Set(this.applicationListForTemplate)]
    this.newTemplateFieldList.forEach(f=>{
      f.templateNm=this.createTemplateFormGroup.get('templateName')?.value
      f.typeDemandeId=this.createTemplateFormGroup.get('typeDemnade')?.value

      // if creation mode this logique works
      if (!this.editMode){

      /*  console.log('im on handel update template  with edit mode false ')
        console.log(this.applicationListForTemplate)*/
        f.applicationList=this.applicationListForTemplate.length == 1?[...this.applicationListForTemplate]:this.applicationListForTemplate[this.applicationListForTemplate.length-1]//this.newTemplateFieldList[0].applicationList

      }else if (this.editMode){

     /*   console.log('im on handel update template  with edit mode true ')
        console.log(this.applicationListForTemplate)*/

        f.applicationList=this.applicationListForTemplate
      }
      f.templateID=this.templateIdentifier
    })

 /*   console.log('list of application on update after fill**************************** ')
    console.log(this.newTemplateFieldList)*/

      this.dfService.updateTemplateOnDb(this.newTemplateFieldList).subscribe({
        next:(data)=>{
          this.toastr.success('Template : '+this.templateName+' Saved successfully  ', "Sucess", {duration: 10000})
          location.reload()
        },
        error:(err)=>{
          this.toastr.danger('Template : '+this.templateName+' Could not be saved  ' + err.error.message, "Error", {duration: 10000})

        }
      })

/*
    console.log(this.newTemplateFieldList)*/


  }


  handelDeleteTemplate(templateID: string) {
    if (window.confirm(" Êtes vous sur de vouloir supprimer cette Template ? Cette action est irreversible")){
      this.dfService.deleteTemplate(templateID).subscribe({
        next:data=>{
          this.toastr.success( "Template supprimée", "Success");
          location.reload()
        },
        error:(err)=>{
          this.toastr.danger('Erreur l\'or de la suppression la template ', "Error", {duration: 10000})
          /* console.log('not deleted error')*/
        }
      })
    }


  }

  handelUpdateTemplate(templateID: string) {

    //todo activate   edit mode
    // to show edit and delete  icon  fileds
    //and change init btn to update btn
    this.editMode = true
    // show the update btn
    this.initTemplateBtnHidden=false
    this.addFieledInEditDisabled=false
    this.activateCreationMode=false

    // enable form
    this.createTemplateFormGroup.enable()
    this.formParameterCardHidden=false


    console.log('application to display ')
    console.log(this.ignoredAppsForCheck)

    this.dfService.getTemplateById(templateID).subscribe({
      next:(data)=>{
        this.templateIdentifier=templateID

      /*  console.log('data[0].applicationList.length != 1')*/
        this.applicationListForTemplate=data[0].applicationList


     /*   console.log('application list for template ')
        console.log(this.applicationListForTemplate)
        console.log('all data from db update')
        console.log(data)*/

        this.fillFormWithValuesFromDb(data)
        this.initCreateTemplateFormGroup()
        this.handelPreviewform(this.newTemplateFieldList)

      },
      error:(err)=>this.toastr.danger('erreur de chargement de la template ', "Error", {duration: 10000})
    })
    //todo  activate application list input
    // change btn from save template to update template

    //this.handelViewTemplate(templateID)

    //todo implement after field update

  }



  handelAddFieldFromChild(field :FormTemplate){



    // implement push data emited from child to  newTemplateFieldList

    let isFieldExist :boolean=false

    this.newTemplateFieldList.forEach(f=>{
      if(field.formCtlName === f.formCtlName){
        isFieldExist=true
      }
    })


    if ((isFieldExist && this.addFieldOnEditMode) || (isFieldExist && this.addFieldOnEditMode == null)){
      this.toastr.danger('le champ '+field.formCtlName+ '  exist dèjà', "Error", {duration: 10000})
    }else {
      if(field.id_aft == '' && field.index == undefined ){

        field.index=this.newTemplateFieldList.length
        this.newTemplateFieldList.push(field)

        this.toastr.success('Filed Added : '+field.label , "Sucess", {duration: 10000})
        this.handelPreviewform(this.newTemplateFieldList)


      }else if(field.id_aft != '' && field.index != undefined){


        this.newTemplateFieldList[field.index] = field
        this.handelPreviewform(this.newTemplateFieldList)
      }
    }




  }

  handelDeleteFeild(feild :FormTemplate, i: number) {
    if (feild.id_aft != ''){
      this.handelDeleteFeildFromDb(feild.id_aft,i)
    }else {
      this.newTemplateFieldList.splice(i,1)
      this.handelPreviewform(this.newTemplateFieldList)
    }
  }
  handelAddFieldInEditMode(){

    this.addFieldOnEditMode=true

    this.fieldForEditMode = {
      id_aft:'',
      index : undefined,
      templateNm: '',
      templateID: this.templateIdentifier,
      inputTp: '',
      label: '',
      placeholder: '',
      formCtlName: '',
      typeDemandeId:'',
      applicationList:this.applicationListForTemplate,
      validators: [
        //todo replace val types with Enums
        {
          valType: 'required',
          valSubType:'not yet defined',
          description:' champ obligatoir',
          valValue:''
        },
        {
          // todo check if this is the type to indicate value lenght
          valType: 'minLenght',
          valSubType:'not yet defined',
          description:'doit contenir au moin ',
          valValue:''
        },
        {
          valType: 'pattern',
          valSubType:'not yet defined',
          description:'validator description',
          valValue:''
        },
        {
          valType: 'min',
          valSubType:'not yet defined',
          description:'valeur min est :',
          valValue:''
        },
        {
          valType: 'max',
          valSubType:'not yet defined',
          description:'valeur max est :',
          valValue:''
        }


      ]
    }

  }

  handelEditFeild(field: FormTemplate ,index:number) {


    this.fieldForEditMode=field
    this.indexForEditMode=index
    this.addFieldOnEditMode=false
    this.editMode=true

    /*let formFieled :FormTemplate ={
      id_aft:'',
      templateNm: 'leave it as is ',
      templateID: '8888888',
      inputTp: 'date',
      label: 'test label',
      placeholder: 'some place holder ',
      formCtlName: 'somecontrole name',
      typeDemandeId:'55555555',
      applicationList:[],
      validators: []
    }

    this.dfService.updateField(field.id_aft,formFieled).subscribe({
      next:(data)=>{
        console.log(data)
        console.log('sucess ')
      },
      error:(err)=>console.log('errrorrr filed update ')
    })*/
  }

  handelDeleteFeildFromDb(id_aft:string ,index:number) {
    this.dfService.deleteFieldFromDb(id_aft).subscribe({
      next:data=>{
        this.newTemplateFieldList.splice(index,1)
        this.handelPreviewform(this.newTemplateFieldList)
      },
      error:(err)=>{this.toastr.danger('Erreur l\'or de la supression du champ','Error')}
    })

  }






  /*  **************************** OLD REFACTORED CODE   ***************************  */

  //todo remove handelPreview Old Version if the currentone is good
 /* handelPreviewform() {


    this.newTemplateFieldList.forEach(f=>{
      let validatorList :  ValidatorFn[] = []
      f.validators.forEach(v => {
        if(v.valType === 'required') validatorList.push(Validators.required)
        if(v.valType === 'minLenght') validatorList.push(Validators.minLength(v.valValue))
        if (v.valType === 'pattern') validatorList.push(Validators.pattern(v.valValue))
        if (v.valType === 'min') validatorList.push(Validators.min(v.valValue))
        if (v.valType === 'max') validatorList.push(Validators.max(v.valValue))
        if (v.valType === 'maxLength')validatorList.push(Validators.maxLength(v.valValue))
      })
      this.genFormGroup.addControl(f.formCtlName,new FormControl('',validatorList))

    })


    this.sortFeilds(this.formFields)


    //todo remove this old version if the new one is good
   /!*
   refactored to this.sortFeilds(this.formFields)
   *!/
  /!*  this.formFields=this.newTemplateFieldList.sort((a,b)=>{

      // @ts-ignore
      if(a.index > b.index){
        return 1
        // @ts-ignore
      }else if(a.index < b.index){
                return -1
              }

      return  0
    });*!/

  }*/


}
