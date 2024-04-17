import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AvailableFields} from "../../types/available-fields";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormTemplate} from "../../types/form-template";
import {NbToastrService} from "@nebular/theme";
import {Application} from "../../types/application";


@Component({
  selector: 'gh-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {




  constructor(private fb:FormBuilder,private toastr: NbToastrService) { }

  addFieldFormGroup !:FormGroup

  requiredToggle:boolean=false
  limitCharToggle:boolean=false
  charTypeToggle:boolean=false
  placeHolderToggle:boolean=false
  valMinMaxToggle:boolean=false
  refInputToggle:boolean=false
  activateAddField:boolean=true
  editeModeInChild:boolean=true

  avFields : AvailableFields[]=[

    {
      "field":"personeAremplacerOuAdupliquer",
      "type":"text",
      "label":"Personne à remplacer ou à dupliquer"
    },
    {
      "field":"nouvelleFonction",
      "type":"text",
      "label":"Nouvelle fonction"
    },
    {
      "field":"codeProfile",
      "type":"text",
      "label":"Code profile"
    },
    {
      "field":"libeleProfile",
      "type":"text",
      "label":"Libelle profile"
    },
    {
      "field":"dateDebut",
      "type":"date",
      "label":"Date de début"
    },
    {
      "field":"dateFin",
      "type":"date",
      "label":"Date de fin"
    },
    {
      "field":"saisieLibre",
      "type":"text",
      "label":"Saisie Libre"
    },
]
  @Input()
  applicationList!:Application[]

  refInputs :string[] =[
    'List Role Fonctionnels',
    'List Application',
    'List Permissions'
  ]

  characterTypes : string[] =[
    'Numeric',
    'Alphabet',
    'Alpha-numeric',
    'email'
  ]

  @Input()
  typeDemandeId!: string;
  @Output()
  newTemplateFiledEventEmitter =new EventEmitter<FormTemplate>();

  @Output()
  activteSaveTemplateBtn =new EventEmitter<boolean>();
  formControlName!:string
  inputTypePlaceHolder!:string

  isSelected !:boolean
  isAvfSelected!: boolean;

  @Input()
  templateName !:string
  @Input()
  templateID!:string
  @Input()
  showFieldTable!: boolean;
  @Input()
  indexForUpdate!:number
  @Input()
  fieledForUpdate!:FormTemplate
  @Input()
  addFieledOnEdit!:boolean
  @Input()
  creationMode!: boolean;
  initFormValues!:FormTemplate
  initAddFormValues!:FormTemplate

  ngOnInit(): void {

    this.initFormValues= {
      id_aft:'',
      index : undefined,
      templateNm: '',
      templateID: '',
      inputTp: '',
      label: '',
      placeholder: ' ',
      formCtlName: '',
      typeDemandeId:'',
      applicationList:[],
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



    this.generateFieldForm()

  }


  initFormOnSelectFieldOnCreationMode(placeHolder:string,label:string){

    this.initFormValues= {

      id_aft:'',
      index : undefined,
      templateNm: '',
      templateID: '',
      inputTp: '',
      label: label,
      placeholder: placeHolder,
      formCtlName: '',
      typeDemandeId:'',
      applicationList:[],
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



    this.generateFieldForm()

  }

  ngOnChanges(changes: SimpleChanges) {


      if (this.addFieledOnEdit){

        this.avFields=[

          {
            "field":"personeAremplacerOuAdupliquer",
            "type":"text",
            "label":"Personne à remplacer ou à dupliqué"
          },
          {
            "field":"nouvelleFonction",
            "type":"text",
            "label":"Nouvelle function"
          },
          {
            "field":"codeProfile",
            "type":"text",
            "label":"Code profile"
          },
          {
            "field":"libeleProfile",
            "type":"text",
            "label":"Libelle profile"
          },
          {
            "field":"dateDebut",
            "type":"date",
            "label":"Date de début"
          },
          {
            "field":"dateFin",
            "type":"date",
            "label":"Date de fin"
          },
          {
            "field":"saisieLibre",
            "type":"text",
            "label":"Saisie Libre"
          },
        ]
      }
    this.initFormValues=this.fieledForUpdate
    this.setInputTypePlaceHolder(this.fieledForUpdate.inputTp)
    this.generateFieldForm()

  }

//***********************************************************************************

  handelAddField() {


    let f=this.addFieldFormGroup

    let typeDemandePlaceHolder:string=''
    let idAftPlaceHolder:string=''
    let templateIdPlaceHolder :string =''
    let formControleNamePlaceHolder:string=''
    let applicationListPlaceHolderEdit:Application[]
    let applicationListPlaceHolderCreate:Application

      if(this.creationMode){

        typeDemandePlaceHolder=''
        idAftPlaceHolder=''
        templateIdPlaceHolder=this.templateID
        formControleNamePlaceHolder=this.formControlName
        applicationListPlaceHolderCreate=this.applicationList[this.applicationList.length-1];

      }else {

        typeDemandePlaceHolder= this.fieledForUpdate.typeDemandeId
        idAftPlaceHolder=this.fieledForUpdate.id_aft
        templateIdPlaceHolder=this.fieledForUpdate.templateID
        formControleNamePlaceHolder=this.addFieledOnEdit?this.formControlName:this.fieledForUpdate.formCtlName
        applicationListPlaceHolderEdit=this.applicationList
      }


    const fieled :FormTemplate ={
      'id_aft':idAftPlaceHolder,
      'index':this.addFieledOnEdit? undefined:this.indexForUpdate,
      'templateNm':this.templateName.trim(),
      'templateID':templateIdPlaceHolder,
      //todo check if i need that when i add afield
      // // 'templateID':this.templateID,
      'inputTp': this.inputTypePlaceHolder,
      'label':f.get('filedLabel')?.value,
      'placeholder':f.get('filedPlaceHolder')?.value,
      'formCtlName':formControleNamePlaceHolder,
      'typeDemandeId': '0020c9da-dcf4-469f-8b15-2eefaba8e109' ,//typeDemandePlaceHolder,
      'applicationList':this.applicationList[this.applicationList.length-1],// filed name from available fields
      'validators':[
        //todo replace val types with Enums
        {
          valType: 'required',
          valSubType:'not yet defined',
          description:' champ obligatoire',
          valValue:f.get('requiredFieled')?.value
        },
        {
          // todo check if this is the type to indicate value lenght
          valType: 'minLenght',
          valSubType:'not yet defined',
          description:'doit contenir au moin ',
          valValue:f.get('filedCharLimit')?.value
        },
        {
          valType: 'pattern',
          valSubType:'not yet defined',
          description:'validator description',
          valValue:f.get('filedCharTypeAllowed')?.value
        },
        {
          valType: 'min',
          valSubType:'not yet defined',
          description:'valeur min est :',
          valValue:f.get('filedValueMin')?.value
        },
        {
          valType: 'max',
          valSubType:'not yet defined',
          description:'valeur max est :',
          valValue:f.get('filedValueMax')?.value
        },
        {
          valType: 'maxLength',
          valSubType:'not yet defined',
          description:'ne doit pas dépasser :',
          valValue:'255'
        },


      ]
    }



     let label=this.addFieldFormGroup

    if(  label.get('filedLabel')?.value === null || label.get('filedLabel')?.value.match('^\\s*$') || label.get('filedLabel')?.value === undefined){
      this.toastr.danger('Label : '+label.get('filedLabel')?.value+' Is not valid Please enter a valid label ', "Error", {duration: 10000})

    }else {

      this.newTemplateFiledEventEmitter.emit(fieled)
      this.activteSaveTemplateBtn.emit(false)

    }


  }


//***********************************************************************************



// shows the available fields on  a table




  generateFieldForm( ){


    this.addFieldFormGroup=this.fb.group({

    })

      this.addFieldFormGroup.addControl('typesOfInputes',new FormControl(''))
      this.addFieldFormGroup.addControl('requiredFieled',new FormControl(this.initFormValues.validators[0].valValue))
      this.addFieldFormGroup.addControl('filedLabel',new FormControl(this.initFormValues.label,Validators.required))
      this.addFieldFormGroup.addControl('filedPlaceHolder',new FormControl(this.initFormValues.placeholder))
      this.addFieldFormGroup.addControl('filedCharLimit',new FormControl(this.initFormValues.validators[1].valValue))
      this.addFieldFormGroup.addControl('filedCharTypeAllowed',new FormControl(this.initFormValues.validators[2].valValue))
      this.addFieldFormGroup.addControl('filedValueMin',new FormControl(this.initFormValues.validators[3].valValue))
      this.addFieldFormGroup.addControl('filedValueMax',new FormControl(this.initFormValues.validators[4].valValue))



    //this.addFieldFormGroup.reset()

  }



  handelSetFormControleName(controleName:string,label:string) {

    this.formControlName=controleName
    this.initFormOnSelectFieldOnCreationMode(label.toLowerCase(),label)



  }

  handelSetIputToggles(requiredToggle:boolean=false, limitCharToggle:boolean=false,
                       charTypeToggle:boolean=false, placeHolderToggle:boolean=false,
                       valMinMaxToggle:boolean=false, refInputToggle:boolean=false){


    this.requiredToggle=requiredToggle
    this.limitCharToggle=limitCharToggle
    this.charTypeToggle=charTypeToggle
    this.placeHolderToggle=placeHolderToggle
    this.valMinMaxToggle=valMinMaxToggle
    this.refInputToggle=refInputToggle


  }

  setInputTypePlaceHolder(inputType:string){


    switch (inputType != null) {

      case inputType === 'date':
        this.inputTypePlaceHolder=inputType
        this.handelSetIputToggles(false,true,true,true,true,true)
        this.activateAddField=false
        //this.addFieldFormGroup.reset()
        break;
      case inputType === 'text':
        this.inputTypePlaceHolder=inputType
        this.handelSetIputToggles(false,false,false,false,true,true)
        this.activateAddField=false
        //this.addFieldFormGroup.reset()
        break;
      case inputType === 'number' :
        this.inputTypePlaceHolder=inputType
        this.handelSetIputToggles(false,true,true,false,false,true)
        this.activateAddField=false
        //this.addFieldFormGroup.reset()
        break;
      default :
        this.inputTypePlaceHolder=''
        this.handelSetIputToggles(false,false,false,false,false,false)
        this.showFieldTable=false
        //this.addFieldFormGroup.reset()

    }

  }


  setActivateAddFielBtn() {


/*    console.log('im called ')
    if (this.activateAddField == true){
      console.log(' value set  ')
      this.activateAddField=false
    }*/
  }

  handelUpdateFeild() {

  }
}
