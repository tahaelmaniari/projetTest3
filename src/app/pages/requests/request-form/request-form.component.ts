import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {NbDateService, NbToastrService} from "@nebular/theme";
import {User} from "../../../types/user";
import {Request} from "../../../types/request";
import {Application} from "../../../types/application";
import {TypeDemande} from "../../../types/typeDemande";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {CompleterData, CompleterService} from "ng2-completer";
import {PanierApplication} from "../../../types/panierApplication";
import {RoleApplicatif} from "../../../types/role-applicatif";
import {FormTemplate} from "../../../types/form-template";
import {BasketItem} from "../../../types/BasketItem";
import {FormHabData} from "../../../types/formHabData";
import {GlobaleRequestObject} from "../../../types/globaleRequestObject";
import {Panier} from "../../../types/constant";
import {AvailableFeilds} from "../../../types/AvailableFeilds";
import {State} from "../../../@core/state";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  // baseUrl: string=environment.baseUrl;
  profile: any;
  files: any[]=[];
  users: User[]=[];
  loading: boolean=false;

  dateToday=this.dateService.addDay(this.dateService.today(),  0);
  currentUser!: User;
  loadingIndicator: boolean=false;
  min!: Date;
  applications: Application[]=[];
  roleApplicatif:RoleApplicatif[]=[]
  roleApp!:RoleApplicatif
  //apps: string[]=["Delta", "OD", "vm"];
  filterApps!: Observable<Application[]>;
  //selectedRoleApplicatifList:RoleApplicatif[]=[]
  selectedRoleApplicatifNames:string[]=[]
  typeDemandes: TypeDemande[]=[];
  templateLink!: string
  valid: boolean=false;
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  /*filesForm!: FormGroup;*/
  templateFileAvailable: boolean=false;
  //attachments: Attachment[]=[];
  idRequest!: string;
  isEdit!: boolean;
  request!: Request;
  validators: User[]=[];
  control = new FormControl();
  dataService!: CompleterData;
  formFields !: FormTemplate[]
  formHabDataFromDb!:FormHabData
  typeDemandeToInitForm!:TypeDemande
  newTemplateFieldList : FormTemplate[] =[]
  isSelected !:boolean
  selectedApplication !:string
  source!: any;
  state!:State
  creationMode:boolean=true
  basketItemIndex!:number
  basketItemtype!: string;
  formControleNames:string[]=[AvailableFeilds.PERSONNE_A_REMPLACER_OU_A_DUPLIQUER,
                              AvailableFeilds.NOUVELLE_FONCTION,
                              AvailableFeilds.CODE_PROFILE,
                              AvailableFeilds.LIBELLE_PROFILE,
                              AvailableFeilds.DATE_DEBUT,
                              AvailableFeilds.DATE_FIN,
                              AvailableFeilds.SAISIE_LIBRE]

  panierApplicationStandard:PanierApplication =new class implements PanierApplication {
    panier_id = ''
    type=Panier.TYPE_STANDARD
    libelle='PanierStandard'
    basketItemList:BasketItem[]=[]
  }
  panierApplicationPonctuel:PanierApplication =new class implements PanierApplication {
    panier_id = ''
    type=Panier.TYPE_PONCTUELLE
    libelle='PanierPonctuelle'
    basketItemList:BasketItem[]=[]
  }

  listePanier:PanierApplication[]=[]


  applicationNameforBasketItem!:string
  application!: Application;
  typeDemande!: TypeDemande;

  applicationsSearchLabel: string[]=['name'];
  @ViewChild('autoInput') input: any;
  genFormGroup!: FormGroup;
  selectedTd!: TypeDemande;
  templateNameForPreview!: string;
  isEditRequestMode: boolean=false;
  isEditItemMode: boolean=false;
  selectedRole: RoleApplicatif[]=[];


  constructor(private fb: FormBuilder,
              private toastr: NbToastrService,
              protected dateService: NbDateService<Date>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private completerService: CompleterService,
              private cdr:ChangeDetectorRef) {
    this.dataService = completerService.local(this.applications, 'name', 'name');
    this.min = this.dateService.addMonth(this.dateService.today(), -1);
  }



  ngOnInit(): void {

    // this.profile=this.userService.getUserProfile();
    this.getCurrentUser()
    // this.getUserFonctionFromDB()
    this.getApplications();
    this.getValidators();

    this.genFormGroup =this.fb.group({})
    this.initFirstForm()

/*    this.firstForm=this.fb.group({
      application: [this.selectedApplication,Validators.required],
      typeDemande: this.fb.control(this.selectedTd),
      roleApplicatif:[this.selectedRole]
    });*/

    console.log('first form value')
    console.log(this.firstForm.value)
    this.secondForm=this.fb.group({
      assignee: [this.request?.assignee, Validators.required]
    })
    this.activatedRoute.data.subscribe((data)=>{this.isEdit= data['isEdit'];});



    console.log('is edit value  .....'+this.isEdit)

    if(this.isEdit){
      this.creationMode=false
      this.activatedRoute.params.subscribe((params)=> {
        this.idRequest = params['id'];
        this.loadRequest(this.idRequest)
        this.isEditItemMode=true
        console.log('id request :'+ this.idRequest)
        /*this.requestService.get(this.idRequest).subscribe((res: Request)=> {
          this.request = res;
          this.initForm(this.typeDemandeToInitForm);
        },(err)=>{
          this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
        });*/
      });
    }

  }
  initEditForm(appId:string,typeDemande:TypeDemande,roleApplicatif:RoleApplicatif[]){



    this.selectedRoleApplicatifNames=[]
    setTimeout(()=>{
      roleApplicatif.forEach(ra =>{
        if (ra.name != null) {
          this.selectedRoleApplicatifNames.push(ra.name)
        }
      })
      this.cdr.markForCheck()
      this.firstForm=this.fb.group({
        application: [appId],
        typeDemande: [typeDemande],
        roleApplicatif:[this.selectedRoleApplicatifNames]
      });

    },1000)



    console.log(this.firstForm.value)
/*    if (this.selectedRole.length>0){
      console.log('selected  role full')
      this.firstForm=this.fb.group({
        application: [appId],
        typeDemande: [typeDemande],
        roleApplicatif:[roleApplicatif]
      });
    }else {
      console.log('selected  role empty')
    }*/

  }

  //********************************** Get Data From DB Functions *********************//
  handelSearchNameRoleAndTypeDemande(applicationId:string){
    /*this.applicationService.get(applicationId).subscribe({
      next: data =>{
        this.applicationNameforBasketItem=data.name
        this.roleApplicatif=data.roleApplicatifList
        this.typeDemandes=data.typeDemandeList
        console.log(data)
      },
      error:(err)=>{console.log('error role and type demande')}})*/
  }


  loadRequest(id: string){
    this.loading=true
    /*this.requestService.get(id).subscribe(res=>{
      this.loading=false;
      this.request=res;


      console.log(res.panierListIdCommaSeparated.split(','))
      let panierIds:string[]=res.panierListIdCommaSeparated.split(',')
      //todo refactor to ist own function


      panierIds.forEach(pId =>{
        if(pId != null && pId !=''){

          this.requestService.getPanier(pId).subscribe({
            next:dta=>{
              if (dta.type == Panier.TYPE_STANDARD){
                this.panierApplicationStandard=dta
              }else {
                this.panierApplicationPonctuel=dta
              }
              console.log(dta)
            },
            error:(err)=>console.log(err.error.message)
          })
        }
      })

      this.source=this.request.tasks
    },(err)=>{
      if (err.status==403){
        this.router.navigateByUrl("/pages/not-found")
      }
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }
  getCurrentUser(){
    this.currentUser={
      authorities: [],
      email: this.profile?.email,
      enabled: false,
      //todo replace value dynamicly
      fonction:this.profile?.fonction,
      firstName: this.profile?.firstName,
      lastName: this.profile?.lastName,
      matricule: this.profile?.matricule,
      provenance: this.profile?.provenance,
      id: this.profile?.userId

    }
  }
  getValidators(){
    /*this.userService.getValidators(this.profile?.userId).subscribe(validators=>{
      console.log("success validators list")
      this.validators=validators;
    },(err)=>{
      console.log("error validators list")
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }
  getApplications(){
   /* this.applicationService.getAll().subscribe((res)=>{
      this.filterApps=of(res);
      this.applications=res;
      this.dataService = this.completerService.local(this.applications, 'name', 'name');
    });*/
  }
  handelGetTemplate(selectedTd: TypeDemande) {

/*    console.log('selected app id xxxxxxxxxxxxxxx'+ this.selectedApplication)*/
    //this.dfService.getTemplateByAppIdandTypeDemandeId(this.selectedApplication,selectedTd.id).subscribe({
     // next:data=>{
       // this.newTemplateFieldList=data
     /*   console.log('ress xxxxxxxxxxxxxxx')
        console.log(this.newTemplateFieldList)*/
       // this.handelPreviewform()

        //this.templateNameForPreview='test'
        // this.templateNameForPreview=data.length>0?this.templateNameForPreview=data[0].templateNm:this.templateNameForPreview=''
       /* console.log('success template')
        console.log(data)*/
      // },

      // error:(err)=> console.log('errr template ')
    // })

  // }
  // getUserFonctionFromDB(){
    /*
    this.userService.getUser().subscribe({
      next:data =>{
        console.log('user from db ')
        console.log(data)
      }
    })*/
  }


  //********************************** Utility Functions *********************//

  preInitForm(itemIndex:number,typePanier:string){


  //****************************** filling variables that we will use to initilize the edit form **********************
    this.typeDemandeToInitForm={
      id: typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].typeDemandeId:this.panierApplicationPonctuel.basketItemList[itemIndex].typeDemandeId,
      libelle: typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].typeDemandeName:this.panierApplicationPonctuel.basketItemList[itemIndex].typeDemandeName
    }

    this.selectedApplication=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].applicaionId:this.panierApplicationPonctuel.basketItemList[itemIndex].applicaionId
    this.formHabDataFromDb=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].formHabData:this.panierApplicationPonctuel.basketItemList[itemIndex].formHabData

    //initilize role lists before filling them again from another item
    this.selectedRole=[]


    this.selectedRole=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].roleApplicatifList:this.panierApplicationPonctuel.basketItemList[itemIndex].roleApplicatifList

    this.cdr.detectChanges()




  }

  initFirstForm(){
    this.firstForm=this.fb.group({
      application: [null],
      typeDemande: [null],
      roleApplicatif:[[]]
    });
  }
  initForm(td:TypeDemande){




    this.selectedTd=td
    this.firstForm=this.fb.group({
      application: [this.selectedApplication,Validators.required],
      typeDemande: this.fb.control(this.selectedTd),
      roleApplicatif:[this.selectedRoleApplicatifNames]
    });


    this.secondForm=this.fb.group({
      assignee: [this.request?.assignee, Validators.required]
    })

  }
  handelApplicationChangeEvent() {

    //reset formControle to not have previous role left on the input mixed up with role from the next selected app
    // todo return these back

    console.log('im called on change app value '+this.selectedApplication)

    this.firstForm.controls['roleApplicatif'].reset()
    this.firstForm.controls['typeDemande'].reset()
    this.genFormGroup.reset()
    this.handelSearchNameRoleAndTypeDemande(this.selectedApplication)


  }
  handelPreviewform() {

    let formControleNames:string[]=['personeAremplacerOuAdupliquer','nouvelleFonction','codeProfile','libeleProfile','dateDebut','dateFin','saisieLibre']

    this.newTemplateFieldList.forEach(f=>{

      let validatorList :  ValidatorFn[] = []
      if (formControleNames.includes(f.formCtlName)){

        f.validators.forEach(v => {
          if(v.valType === 'required') validatorList.push(Validators.required)
          if(v.valType === 'minLenght') validatorList.push(Validators.minLength(v.valValue))
          if (v.valType === 'pattern') validatorList.push(Validators.pattern(v.valValue))
          if (v.valType === 'min') validatorList.push(Validators.min(v.valValue))
          if (v.valType === 'max') validatorList.push(Validators.max(v.valValue))
          if (v.valType === 'maxLength')validatorList.push(Validators.maxLength(v.valValue))
          if (v.valType === 'maxLength')validatorList.push(Validators.maxLength(v.valValue))

        })
        console.log('im inside handelPreview isEdit value :' +this.isEdit)
        if(this.isEdit){

          let formHabKeyIndex:number=Object.keys(this.formHabDataFromDb).indexOf(f.formCtlName)
          // @ts-ignore
          this.genFormGroup.addControl(f.formCtlName, new FormControl(f.formCtlName === Object.keys(this.formHabDataFromDb)[formHabKeyIndex]?this.formHabDataFromDb[f.formCtlName]:'',validatorList))
        }else {

          this.genFormGroup.addControl(f.formCtlName, new FormControl('',validatorList))
        }

      }

    })
    this.genFormGroup.updateValueAndValidity()
    this.formFields=this.newTemplateFieldList;
  }
  compareByValueProperty(v1: any, v2: any): boolean {
    return v1.id === v2.id;
  }
  //********************************** Basket Related Functions *********************//

  addToBasket() {


    let isDuplicateApplicationPanierStandard:boolean=false
    this.panierApplicationStandard.basketItemList.forEach(bi=>{
      if(bi.applicationName != this.applicationNameforBasketItem){isDuplicateApplicationPanierStandard=false}
      else{isDuplicateApplicationPanierStandard=true}
    })

    let isDuplicateApplicationPanierPonctuelle:boolean=false
    this.panierApplicationPonctuel.basketItemList.forEach(bi=>{
      if(bi.applicationName != this.applicationNameforBasketItem){isDuplicateApplicationPanierStandard=false}
      else{isDuplicateApplicationPanierPonctuelle=true}
    })


    let validFormControles:boolean []=[]
    this.newTemplateFieldList.forEach(f=>{
      if (this.formControleNames.includes(f.formCtlName)){
        // @ts-ignore
        validFormControles.push(this.genFormGroup.get(f.formCtlName)?.valid)
      }
    })

    let dateDebut=this.genFormGroup.get('dateDebut')
    let dateFin=this.genFormGroup.get('dateFin')

    let formDataObject :FormHabData ={
      personeAremplacerOuAdupliquer:this.genFormGroup.get('personeAremplacerOuAdupliquer')?.value,
      nouvelleFonction:this.genFormGroup.get('nouvelleFonction')?.value,
      codeProfile:this.genFormGroup.get('codeProfile')?.value,
      libeleProfile:this.genFormGroup.get('libeleProfile')?.value,
      dateDebut:dateDebut?.value != null && dateDebut?.value?dateDebut?.value.toString():dateDebut?.value,
      dateFin:dateFin?.value !=null?dateFin?.value.toString():dateFin?.value,
      saisieLibre:this.genFormGroup.get('saisieLibre')?.value,
    }

    let basketItemObject :BasketItem  ={
      basket_item_id:'',
      applicaionId:this.firstForm.value.application,
      applicationName:this.applicationNameforBasketItem,
      typeDemandeId:this.firstForm.value.typeDemande.id,
      typeDemandeName:this.firstForm.value.typeDemande.libelle,
      roleApplicatifList:this.selectedRole,
      formHabData:formDataObject
    }

    if (!this.selectedTd.libelle.includes(Panier.PONCTUELLE) && !isDuplicateApplicationPanierStandard ){

      if (validFormControles.every(v=> v== true)){
        // this.applicationService.get(this.selectedApplication).subscribe({
          // next:data=>{this.applicationNameforBasketItem=data.name},
          // error:(err)=>{console.log('error retriving app name for id '+this.selectedApplication)}
        // })
        this.panierApplicationStandard.basketItemList.push(basketItemObject)
        this.genFormGroup.reset()
        this.selectedRole=[]

        this.firstForm.controls['roleApplicatif'].reset()
      }else {
        this.toastr.danger("formulaire incomplet", "Erreur ", {duration: 10000})
      }

    }else if (this.selectedTd.libelle.includes(Panier.PONCTUELLE) && !isDuplicateApplicationPanierPonctuelle  ) {
      if (validFormControles.every(v=> v== true)){
        // this.applicationService.get(this.selectedApplication).subscribe({
          // next:data=>{this.applicationNameforBasketItem=data.name}
        // })
        this.panierApplicationPonctuel.basketItemList.push(basketItemObject)
        this.firstForm.controls['roleApplicatif'].reset()
        this.selectedRole=[]
        this.genFormGroup.reset()

      }else {
        this.toastr.danger("formulaire incomplet ", "Erreur ", {duration: 10000})
      }
    }
    else {

      this.toastr.danger("Application Dupliqué", "Erreur ", {duration: 10000})
    }
    basketItemObject.applicationName=this.applicationNameforBasketItem
  }


  updateBasket() {

    //todo update basketItem  and reload
    let dateDebut=this.genFormGroup.get('dateDebut')
    let dateFin=this.genFormGroup.get('dateFin')

    let formDataObject :FormHabData ={
      personeAremplacerOuAdupliquer:this.genFormGroup.get('personeAremplacerOuAdupliquer')?.value,
      nouvelleFonction:this.genFormGroup.get('nouvelleFonction')?.value,
      codeProfile:this.genFormGroup.get('codeProfile')?.value,
      libeleProfile:this.genFormGroup.get('libeleProfile')?.value,
      dateDebut:dateDebut?.value != null && dateDebut?.value?dateDebut?.value.toString():dateDebut?.value,
      dateFin:dateFin?.value !=null?dateFin?.value.toString():dateFin?.value,
      saisieLibre:this.genFormGroup.get('saisieLibre')?.value,
    }

    let basketItemObject :BasketItem  ={
      basket_item_id:this.basketItemtype == Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[this.basketItemIndex].basket_item_id:this.panierApplicationStandard.basketItemList[this.basketItemIndex].basket_item_id,
      applicaionId:this.firstForm.value.application,
      applicationName:this.applicationNameforBasketItem,
      typeDemandeId:this.firstForm.value.typeDemande.id,
      typeDemandeName:this.firstForm.value.typeDemande.libelle,
      roleApplicatifList:this.selectedRole,
      formHabData:formDataObject
    }

    console.log(' basket item object ')
    console.log(basketItemObject)

    if (this.basketItemtype == Panier.TYPE_STANDARD){

      // this.requestService.updateBi(this.panierApplicationStandard.basketItemList[this.basketItemIndex].basket_item_id,basketItemObject).subscribe({
        // next:data=>{
          location.reload()
          // console.log(data)
        // },
        // error:err => console.log('errror updating basket item')
      // })

    }else if (this.basketItemtype == Panier.TYPE_PONCTUELLE){
      // this.requestService.updateBi(this.panierApplicationPonctuel.basketItemList[this.basketItemIndex].basket_item_id,basketItemObject).subscribe({
        // next:data=>{
          location.reload()
          // console.log(data)
        // },
        // error:err => console.log('errror updating basket item')
      // })

    }

  }

  handelEditBasketItem(i: number, type: string) {

    this.firstForm.reset()
    this.firstForm.get('application')?.disable()
    this.firstForm.get('typeDemande')?.disable()

    // load application data (typedemande and roleApplicatif associated with it )
    //we need it before filling the forms with the values from db
    if (type == Panier.TYPE_STANDARD){
      this.handelSearchNameRoleAndTypeDemande(this.panierApplicationStandard.basketItemList[i].applicaionId)
    }else {
      this.handelSearchNameRoleAndTypeDemande(this.panierApplicationPonctuel.basketItemList[i].applicaionId)
    }


    //should refactor to it's own function
    this.basketItemIndex=i
    this.basketItemtype=type
    this.preInitForm(i,type);
    this.handelGetTemplate(this.typeDemandeToInitForm)
    this.initEditForm(this.selectedApplication,this.typeDemandeToInitForm,this.selectedRole)

  }
  handelDeletFromPanier(index :number , type :string) {


    switch (type != null){
      case (this.isEdit && type == Panier.TYPE_STANDARD):

        // this.requestService.deleteBasketItem(this.panierApplicationStandard.basketItemList[index].basket_item_id).subscribe({
          // next:data=>{
            this.panierApplicationStandard.basketItemList.splice(index,1)
            // console.log(data)
            location.reload()
          // },
          // error:err => {console.log('error deleting basket item ')}

        // })

        break;
      case (!this.isEdit && type == Panier.TYPE_STANDARD):
        this.panierApplicationStandard.basketItemList.splice(index,1)
        break;
      case (this.isEdit && type == Panier.TYPE_PONCTUELLE):
        // this.requestService.deleteBasketItem(this.panierApplicationPonctuel.basketItemList[index].basket_item_id).subscribe({
          // next:data=>{
            this.panierApplicationPonctuel.basketItemList.splice(index,1)
            // console.log(data)
            location.reload()
          // },
          // error:err => {console.log('error deleting basket item ')}
        // })
        break;
      case (!this.isEdit && type == Panier.TYPE_PONCTUELLE):
        this.panierApplicationPonctuel.basketItemList.splice(index,1)
        break;

    }
  }


  //********************************** BPMN  Functions *********************//
  onSubmit(){

    //check  to restrict panier count to 2 (standard , ponctuelle)
    this.state=State.LOADING

    if ( this.listePanier.length < 3 ){
      this.listePanier.push(this.panierApplicationStandard)
      this.listePanier.push(this.panierApplicationPonctuel)

    }

    if(this.firstForm.invalid || this.secondForm.invalid){
      this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.secondForm.markAllAsTouched();
      return;
    }
    this.loadingIndicator=true;
    if(!this.files){
      this.toastr.danger('Veuillez joindre le formulaire de demande', 'Formulaire invalide');
      return;
    }

    let applicationDto:Application={
      id:this.firstForm.value.application,
      name: "attestation",
      description: "attestation description ",
      typeDemandeList :[],
      roleApplicatifList:[],

    }

    let requestDto: Request = {
      initiationDate: this.secondForm.value.closeDate,
      typeDemande: this.firstForm.value.typeDemande,
      application:applicationDto,
      initiator: this.currentUser,
      assignee: this.secondForm.value.assignee,
      panierListIdCommaSeparated:''

    }

    let globaleRequestObject:GlobaleRequestObject ={

      requestDto:requestDto,
      basketList:this.listePanier

    }
  /*  console.log('globale request object ...............')
    console.log(globaleRequestObject)
    console.log('is edit value .......................')
    console.log(this.isEdit)*/

    if(this.isEdit){

      this.request.typeDemande=this.firstForm.value.typeDemande;
      this.request.application= this.firstForm.value.application;
      this.request.assignee=this.secondForm.value.assignee;
      this.request.decision='completer';
      this.affectedTaskPerformer();


      // ******************this part is not valid anymore because there is no file on the WF

 /*     console.log('file length.....')
      console.log( this.files.length)
      console.log('request to be sent .....')
      console.log(this.request)*/
      this.request.application=applicationDto
      this.files.length>0?
        // this.requestService.complete(this.request).subscribe(response=>{
          this.toastr.success("Informations complétées avec succès", "Succès"):
          //this.initForm();
          this.files=[]
          this.router.navigateByUrl("/pages/demandes/en-cours")
        // },(err)=>{
          // this.toastr.danger(err.error.message, "Erreur", {duration: 10000});

          //************************

        // }): this.requestService.submit(this.request).subscribe(response=>{
          this.toastr.success("Informations complétées avec succès", "Succès");
          this.initForm(this.typeDemandeToInitForm);
          this.files=[];
          this.state=State.LOADED
          this.router.navigateByUrl("/pages/demandes/en-cours")
        // },(err)=>{
          this.state=State.LOADED
          // this.toastr.danger(err.error.message, "Erreur", {duration: 10000});
        // })
    } else {
      // this.requestService.create(globaleRequestObject).subscribe((response)=>{
        this.toastr.success("Demande enregistrée avec succès", "Succès");
        this.initForm(this.typeDemandeToInitForm);
        this.files=[];
        this.router.navigateByUrl("/pages/demandes/en-cours")
      // }, (err)=>{
        // this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
      // })
    }

  }

  onFirstSubmit(){

    //todo if user clear the form before clicking next
    // we can refill the form with latest value

    if(this.firstForm.invalid){
      this.toastr.danger('Tous les champs sont obligatoires', 'Formulaire invalide');
      this.firstForm.markAllAsTouched();
      return;
    }
    const dataForm=this.firstForm.value
    this.application=dataForm.application;
    this.typeDemande=dataForm.typeDemande;

    this.templateFileAvailable=false;
    // this.templateService.getByApplicationAndTypeDemande(dataForm.application?.id, dataForm.typeDemande?.id).subscribe(res=>{
      // if(res.length>0){
        this.templateFileAvailable=true;
        // this.templateLink=environment.baseUrl+'/requests/files/'+res[0]?.name;
      }
    // });

  // }

  retirer(){
    this.request.decision='retirer';
     this.affectedTaskPerformer();
    // this.requestService.submit(this.request).subscribe((res) => {
      this.toastr.success("Votre demande a été retirée", "Succès");
      this.router.navigateByUrl("pages/demandes/a-valider")
    // }, (error) => {
      // this.toastr.danger(error.error.message, "Erreur de retrait", {duration: 10000})
    // })
  }

   affectedTaskPerformer() {
    this.request.tasks?.forEach((task) => {
      if (task.bpmActivityId === this.request.currentActivityId) {
        task.performerName = this.profile.lastName + " " + this.profile.firstName;
        if (this.profile.userId != null) {
          task.performerId = this.profile.userId;
        }
        task.performerEmail = this.profile.email;

      }
    })
  }




  // ******************Unused Fonctions but not deleted to avoid potential bugs********************//
  handleFileInput(e: any) {
    this.files = e.target.files;
  }
  conditionnallyRequired(){
    if (!this.isEdit){
      return Validators.required;
    }
    return null;
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      if(item.size>=1000000){
        this.toastr.warning("La taille des fichiers est limitée à 1000Ko");
        return;
      }
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes: number, decimals: number) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  getTypeDemandes(){
    // this.typeDemandeService.getAll().subscribe(res=>{
      // this.typeDemandes=res;
    // },(err)=>{
      // this.toastr.danger(err.error.message, "Erreur de recuperation", {duration: 10000})
    // })
  }
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 500);
  }


  handelAddRoleApplicatif(ra:RoleApplicatif) {


    let incluedTrue:boolean=false
    let indexOfIncluded:number=0
    this.selectedRole.forEach((role,index)=>{
      if (role.role_id == ra.role_id){
        incluedTrue=true
        indexOfIncluded=index
      }})


    if (incluedTrue){
      this.selectedRole.splice(indexOfIncluded,1)
      this.selectedRoleApplicatifNames.splice(indexOfIncluded,1)
    }else {
      this.selectedRole.push(ra)
      this.selectedRoleApplicatifNames.push(ra.name)
    }

  }


 readonly State = State;
}
