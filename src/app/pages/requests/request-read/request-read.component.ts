import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Request} from "../../../types/request";
import {Attachment} from "../../../types/attachment";
import {environment} from "../../../../environments/environment";
import {NbDateService, NbDialogService, NbToastrService} from "@nebular/theme";
import {DatePipe} from "@angular/common";
import {User} from "../../../types/user";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";
import {PanierApplication} from "../../../types/panierApplication";
import {Application} from "../../../types/application";
import {TypeDemande} from "../../../types/typeDemande";
import {RoleApplicatif} from "../../../types/role-applicatif";
import {BasketItem} from "../../../types/BasketItem";
import {Panier} from "../../../types/constant";
import {CompleterData, CompleterService} from "ng2-completer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHabData} from "../../../types/formHabData";
import {FormTemplate} from "../../../types/form-template";
import {State} from "../../../@core/state";

@Component({
  selector: 'app-request-read',
  templateUrl: './request-read.component.html',
  styleUrls: ['./request-read.component.css']
})
export class RequestReadComponent implements OnInit {
  loading: boolean=false;
  //baseUrl: string=environment.baseUrl;
  request!: Request
  files!: Attachment[];
  profile: any;
  source!: any;
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  genFormGroup!: FormGroup;
  //todo set to default false after developpment
  isEditRequestMode:boolean=false
  isEditItemMode:boolean=false
  selectedRoleApplicatifList:RoleApplicatif[]=[]
  application!: Application;
  typeDemande!: TypeDemande;
  applications: Application[]=[];
  roleApplicatif:RoleApplicatif[]=[]
  typeDemandes: TypeDemande[]=[];
  formFields !: FormTemplate[]
  templateNameForPreview!: string;
  isSelected !:boolean
  selectedApplication !:string
  selectedTd!: TypeDemande;
  templateFileAvailable: boolean=false;
  templateLink!: string
  currentUser!: User;
  validators: User[]=[];
  applicationNameforBasketItem!:string
  dataService!: CompleterData;
  filterApps!: Observable<Application[]>;
  newTemplateFieldList : FormTemplate[] =[]
  typeDemandeToInitForm!:TypeDemande
  formHabDataFromDb!:FormHabData
  idRequest!: string;

  state!:State
  panierApplicationStandard:PanierApplication =new class implements PanierApplication {
    panier_id  = ''
    type =Panier.TYPE_STANDARD
    libelle ='PanierPonctuelle'
    basketItemList:BasketItem[]=[]
  }
  panierApplicationPonctuel:PanierApplication =new class implements PanierApplication {
    panier_id = ''
    type =Panier.TYPE_PONCTUELLE
    libelle ='PanierPonctuelle'
    basketItemList:BasketItem[]=[]
  }

  constructor(private datePipe: DatePipe,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastr: NbToastrService,
              private router: Router,
              private nbDialogService: NbDialogService,
              protected dateService: NbDateService<Date>,
              private completerService: CompleterService,) { }


  ngOnInit(): void {
    /*this.currentUser=this.userService.getCurrentUser();
    this.activatedRoute.params.subscribe((params)=> {
      const id = params['id'];
      this.loadRequest(id);
    });*/

    //this.profile=this.userService.getUserProfile();
/*    this.genFormGroup =this.fb.group(
      {}
    )*/

    //this.getApplications();
    //this.getValidators();

    if(this.isEditRequestMode){
      this.activatedRoute.params.subscribe((params)=> {
        this.idRequest = params['id'];
      /*  this.requestService.get(this.idRequest).subscribe((res: Request)=> {
          this.request = res;

        },(err)=>{
          this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
        });*/
      });
    }
    //this.initForm();
  }


  //********************************** Get Data From DB Functions *********************//
/*  getValidators(){
    this.userService.getValidators(this.profile?.userId).subscribe(validators=>{
      console.log("success validators list")
      this.validators=validators;
    },(err)=>{
      console.log("error validators list")
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })
  }*/
/*  getApplications(){
    this.applicationService.getAll().subscribe((res)=>{
      this.filterApps=of(res);
      this.applications=res;

      this.dataService = this.completerService.local(this.applications, 'name', 'name');
    });
  }*/
/*   loadRequest(id: string){
    this.loading=true
    this.requestService.get(id).subscribe(res=>{
      this.loading=false;
      this.request=res;

      this.activateEditRequestMode(res.status)

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
    })
  } */
/*  handelGetTemplate(selectedTd: TypeDemande) {

    console.log('selected app id'+ this.selectedApplication)
    this.dfService.getTemplateByAppIdandTypeDemandeId(this.selectedApplication,selectedTd.id).subscribe({
      next:data=>{
        this.newTemplateFieldList=data
        this.handelPreviewform()
        this.templateNameForPreview=data[0].templateNm
        console.log('success template')
        console.log(data)
      },
      error:(err)=> console.log('errr template ')
    })
  }*/

/*
  handelSearchNameRoleAndTypeDemande(selectedApp:string){
    this.applicationService.get(this.selectedApplication).subscribe({
      next: data =>{
        this.applicationNameforBasketItem=data.name
        this.roleApplicatif=data.roleApplicatifList
        this.typeDemandes=data.typeDemandeList
        this.initForm(this.typeDemandeToInitForm)
        console.log(data)
      },
      error:(err)=>{console.log('error role and type demande')}})
  }
*/


  //********************************** Utility Functions *********************//

/*  preInitForm(itemIndex:number,typePanier:string){

    this.firstForm=this.fb.group({
      application: this.fb.control(this.selectedApplication),
      typeDemande: [null, Validators.required],
      roleApplicatif:new FormControl(null)
    });
    this.selectedRoleApplicatifList=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].roleApplicatifList:this.panierApplicationPonctuel.basketItemList[itemIndex].roleApplicatifList
    this.selectedApplication=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].applicaionId:this.panierApplicationPonctuel.basketItemList[itemIndex].applicaionId
    this.formHabDataFromDb=typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].formHabData:this.panierApplicationPonctuel.basketItemList[itemIndex].formHabData

    this.handelSearchNameRoleAndTypeDemande(this.selectedApplication)
    this.typeDemandeToInitForm={
      id: typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].typeDemandeId:this.panierApplicationPonctuel.basketItemList[itemIndex].typeDemandeId,
      libelle: typePanier ==Panier.TYPE_STANDARD?this.panierApplicationStandard.basketItemList[itemIndex].typeDemandeName:this.panierApplicationPonctuel.basketItemList[itemIndex].typeDemandeName
    }

    this.handelGetTemplate(this.typeDemandeToInitForm)


  }*/
/*  initForm(td:TypeDemande){

    this.firstForm=this.fb.group({
      application: this.fb.control(this.selectedApplication),
      typeDemande: [this.typeDemandeToInitForm, Validators.required],
      roleApplicatif:new FormControl(this.selectedRoleApplicatifList)
    });

  }*/
/*  handelAddRoleApplicatif(ra:RoleApplicatif) {
    console.log(ra)
    if (this.selectedRoleApplicatifList.includes(ra)){
      let tdIndex=this.selectedRoleApplicatifList.indexOf(ra)

      this.selectedRoleApplicatifList.splice(tdIndex,1)
    }else {
      this.selectedRoleApplicatifList.push(ra)
    }

  console.log(this.selectedRoleApplicatifList)

  }*/
  activateEditRequestMode(status:string|undefined){

    if (status ==='A completer'){
      this.isEditRequestMode=true
    }else {
      this.isEditRequestMode=false
    }
  }


/*  handelApplicationChangeEvent() {

    //reset formControle to not have previous role left on the input mixed up with role from the next selected app

    this.firstForm.controls['roleApplicatif'].reset()
    this.firstForm.controls['typeDemande'].reset()
    this.genFormGroup.reset()
    this.handelSearchNameRoleAndTypeDemande(this.selectedApplication)


  }*/
/*  handelPreviewform() {


    this.newTemplateFieldList.forEach(f=>{
      let validatorList :  ValidatorFn[] = []
      f.validators.forEach(v => {
        if(v.valType === 'required') validatorList.push(Validators.required)
        if(v.valType === 'minLenght') validatorList.push(Validators.minLength(v.valValue))
        if (v.valType === 'pattern') validatorList.push(Validators.pattern(v.valValue))
        if (v.valType === 'min') validatorList.push(Validators.min(v.valValue))
        if (v.valType === 'max') validatorList.push(Validators.max(v.valValue))
        if (v.valType === 'maxLength')validatorList.push(Validators.maxLength(v.valValue))
        if (v.valType === 'maxLength')validatorList.push(Validators.maxLength(v.valValue))
      })

      let formHabKeyIndex:number=Object.keys(this.formHabDataFromDb).indexOf(f.formCtlName)

      // @ts-ignore
      this.genFormGroup.addControl(f.formCtlName, new FormControl(f.formCtlName === Object.keys(this.formHabDataFromDb)[formHabKeyIndex]?this.formHabDataFromDb[f.formCtlName]:'',validatorList))

    })

    this.formFields=this.newTemplateFieldList;

  }*/



  //********************************** Basket Related Functions *********************//
/*  addToBasket() {

    console.log('application id'+this.firstForm.value.application)
    console.log('application name '+this.firstForm.value.application.name)
    console.log('role applicatif value')
    console.log(this.firstForm.value.roleApplicatif)
    console.log('type de demande  id')
    console.log(this.firstForm.value.typeDemande.id)
    console.log('type de demande  libelle')
    console.log(this.firstForm.value.typeDemande.libelle)

    let isDuplicateApplication:boolean=false
    this.panierApplicationStandard.basketItemList.forEach(bi=>{
      if(bi.applicationName != this.applicationNameforBasketItem){isDuplicateApplication=false}
      else{isDuplicateApplication=true}
    })

    let formDataObject :FormHabData ={

      personeAremplacerOuAdupliquer:this.genFormGroup.get('personeAremplacerOuAdupliquer')?.value,
      nouvelleFonction:this.genFormGroup.get('nouvelleFonction')?.value,
      codeProfile:this.genFormGroup.get('codeProfile')?.value,
      libeleProfile:this.genFormGroup.get('libeleProfile')?.value,
      dateDebut:this.genFormGroup.get('dateDebut')?.value.toString(),
      dateFin:this.genFormGroup.get('dateFin')?.value.toString(),
      saisieLibre:this.genFormGroup.get('saisieLibre')?.value,
    }

    let basketItemObject :BasketItem  ={
      applicaionId:this.firstForm.value.application,
      applicationName:this.applicationNameforBasketItem,
      typeDemandeId:this.firstForm.value.typeDemande.id,
      typeDemandeName:this.firstForm.value.typeDemande.libelle,
      roleApplicatifList:this.firstForm.value.roleApplicatif,
      formHabData:formDataObject

    }



    if (!this.selectedTd.libelle.includes(Panier.PONCTUELLE) && !isDuplicateApplication && this.genFormGroup.valid){
      console.log('type standard')
      this.applicationService.get(this.selectedApplication).subscribe({
        next:data=>{this.applicationNameforBasketItem=data.name},
        error:(err)=>{console.log('error retriving app name for id '+this.selectedApplication)}
      })
      this.panierApplicationStandard.basketItemList.push(basketItemObject)
      this.genFormGroup.reset()
      console.log('333333333333333333333333333333333333333333333333')
      console.log(basketItemObject)

      this.firstForm.controls['roleApplicatif'].reset()

    }else if (this.selectedTd.libelle.includes(Panier.PONCTUELLE) && !isDuplicateApplication && this.genFormGroup.valid) {
      this.applicationService.get(this.selectedApplication).subscribe({
        next:data=>{this.applicationNameforBasketItem=data.name}
      })
      this.panierApplicationPonctuel.basketItemList.push(basketItemObject)
      this.firstForm.controls['roleApplicatif'].reset()
      this.genFormGroup.reset()

    }
    else {this.toastr.danger("Application Dupliqué ou formulaire incomplet", "Erreur ", {duration: 10000})}
    basketItemObject.applicationName=this.applicationNameforBasketItem
  }*/
/*  updateBasket() {

  }*/


/*  handelEditBasketItem(i: number, type: string) {
    this.isEditItemMode=true
    this.preInitForm(i,type);
  }*/
/*
  handelDeletFromPanierStandard(index :number) {this.panierApplicationStandard.basketItemList.splice(index,1)}

*/

  //********************************** BPMN  Functions *********************//
  modifier(){
    this.router.navigateByUrl('/pages/demandes/edit/'+this.request.id);
  }
  affect(assignee: User, tome: boolean){
    console.log('asignee *********************************')
    console.log(assignee)
    this.request.assignee= assignee;
    console.log(this.request.assignee)
   /* this.requestService.assign(this.request).subscribe((request)=>{
      if (tome){
        this.toastr.success("La demande vous a été affectée", "Succès", {duration: 10000})
      } else {
        this.toastr.success("La demande a bien été reaffectée", "Succès", {duration: 10000})
      }

    }, (err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    });*/
  }
  private affectedTaskPerformer() {
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
  submit(decision: string){
    this.nbDialogService.open(ConfirmDialogComponent, {context: {request: this.request, decision: decision}}).onClose.subscribe(({message, assignee, cancel})=>{
      if (cancel) return;
      if (decision==="reaffecter" || decision === "retourner" || decision==="rejeter"){
        if (message===''){
          this.toastr.danger("Merci de renseigner le motif de votre decision", "Erreur");
          return;
        }
      }
      message?
        this.request.message=message:this.request.message="";

      if (decision==="reaffecter"){
        if(assignee){
          this.request.assignee=assignee;
          this.send();
        } else {
          this.toastr.danger("Merci de choisir le nouveau validateur ou traiteur de la demande", "Erreur");
          return;
        }
      } else this.send();
    });
    this.request.decision=decision;
    this.request.tasks?.forEach((task)=>{
      if(task.bpmActivityId===this.request.currentActivityId){
        task.performerName=this.profile.lastName+ " "+this.profile.firstName;
        if (this.profile.userId != null) {
          task.performerId = this.profile.userId;
        }
        task.performerEmail=this.profile.email;

      }
    })
  }
  send() {

    //todo insert loader
    this.state=State.LOADING
   /* this.requestService.submit(this.request).subscribe((res) => {
      this.toastr.success("Votre décision a été prise en compte", "Succès");
      this.state=State.LOADED
      this.router.navigateByUrl("pages/demandes/en-cours")

    }, (error) => {
      this.state=State.LOADED
      this.toastr.danger(error.error.message, "Erreur de validation", {duration: 10000})
    })*/
  }
  hasRighToDecide(): boolean {
    if (this.request?.status==="Rejetée" || this.request?.status==="Cloturée" || this.request?.status==="Retirée"){
      return false;
    }
    return this.request?.assignee?.matricule === this.profile?.matricule && (this.profile?.roles?.includes("CELLULE_HABILITATION") || this.profile?.roles.includes("VALIDATOR"));
  }
  canReaffect(): boolean {
    return this.profile?.roles?.includes("PILOTAGE") && this.request?.assignee!=null;
  }
  canClaim(){
    return (this.request?.status==="A approuver RH" && this.request?.assignee===null && this.profile.roles?.includes("CELLULE_HABILITATION"))
      || (this.request?.status==="A approuver HRBP" && this.request?.assignee===null && this.profile.roles?.includes("HRBP")) ;
  }

  canComplete(){
    return this.request?.status=="A completer" && !this.closed() && this.request.assignee.matricule=== this.profile?.matricule;
  }
  closed(){
    return this.request?.status==="Rejetée" || this.request?.status==="Cloturée" || this.request?.status==="Retirée"
  }





  // Unused Fonctions but not deleted to avoid potential bugs

  toApprove(){
    return this.request?.status=="A approuver validateur" && !this.closed();
  }
  retirer(){
    this.request.decision='retirer';
    this.affectedTaskPerformer();
   /* this.requestService.submit(this.request).subscribe((res) => {
      this.toastr.success("Votre demande a été retirée", "Succès");
      this.router.navigateByUrl("pages/demandes/a-valider")
    }, (error) => {
      this.toastr.danger(error.error.message, "Erreur de retrait", {duration: 10000})
    })*/
  }

  onFirstSubmit(){
    if(this.firstForm.invalid){
      this.toastr.danger('Tous les champs sont obligatoires', 'Formulaire invalide');
      this.firstForm.markAllAsTouched();
      return;
    }
    const dataForm=this.firstForm.value
    this.application=dataForm.application;
    this.typeDemande=dataForm.typeDemande;

    this.templateFileAvailable=false;
    /*this.templateService.getByApplicationAndTypeDemande(dataForm.application?.id, dataForm.typeDemande?.id).subscribe(res=>{
      if(res.length>0){
        this.templateFileAvailable=true;
        this.templateLink=environment.baseUrl+'/requests/files/'+res[0]?.name;
      }
    });*/

  }

  getFile(name: string | undefined)
  {
    //return this.requestService.download(name);
  }
  uploadFile(e: any){
    const file=e.target.files[0];
    if (file){
      /*this.requestService.update(this.request.id, this.request, file).subscribe((res)=>{
        this.toastr.success("Votre fichier a été rattachée à la demande avec succès");
        location.reload();
      }, (err)=>{
        this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
      });*/
    }

  }


 readonly State = State;
}
