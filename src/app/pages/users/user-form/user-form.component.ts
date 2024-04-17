import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {
  @Input()
  //user!: User;
  @Input()
  isEdit!: boolean;
  provenances=["Siège", "Réseau"];
  //todo add role HRBP
  roles=['INITIATOR', 'VALIDATOR', 'CELLULE_HABILITATION', 'ADMIN_FONC', 'PILOTAGE','HRBP']
  userForm!: FormGroup;
  id!: string;

  constructor(private fb: FormBuilder) { }

  /*initForm(){
    this.userForm=this.fb.group({
      matricule: [this.user?.matricule, Validators.required],
      matriculeManager: [this.user?.matriculeManager],
      lastName: [this.user?.lastName, Validators.required],
      firstName: [this.user?.firstName, Validators.required],
      email: [this.user?.email, Validators.required],
      authorities: [this.user?.authorities, Validators.required],
      provenance: [this.user?.provenance, Validators.required],
      delegationRegionale: [this.user?.delegationRegionale],
      entite: [this.user?.entite],
    })
  }*/
  initChangeListener($event: any) {
    console.log($event)
    const entite = this.userForm.get('entite');
    const directionRegionale = this.userForm.get('directionRegionale');
    const matriculeManager = this.userForm.get('matriculeManager');

    if ($event === "Réseau") {
      directionRegionale?.setValidators([Validators.required]);
      console.log(directionRegionale)
    } else if ($event === "Siège") {
      entite?.setValidators([Validators.required]);
      matriculeManager?.setValidators([Validators.required])
    }

    entite?.updateValueAndValidity();
    directionRegionale?.updateValueAndValidity();
    matriculeManager?.updateValueAndValidity();
  }


  ngOnInit(): void {
   // this.initForm();
  }

  onSubmit(){
    const dataForm=this.userForm.value;
    console.log(this.userForm)
    if(this.userForm.invalid){
     // this.toastr.danger('Vous devez saisir tous les champs obligatoires', 'Formulaire invalide');
      this.userForm.markAllAsTouched();
      return;
    }
    /*const userDto: User={
    id: this.user?.id,
      matricule: dataForm.matricule,
      lastName: dataForm.lastName,
      firstName: dataForm.firstName,
      email: dataForm.email,
      entite: dataForm.entite,
      authorities: dataForm.authorities,
      delegationRegionale: dataForm.delegationRegionale,
      provenance: dataForm.provenance,
      enabled: true,
      //todo fill with appropriate value
      fonction:'',
      matriculeManager: dataForm.matriculeManager,
    }*/
  }
}
