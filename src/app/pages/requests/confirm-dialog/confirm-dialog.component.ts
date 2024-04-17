import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {UserService} from "../../../services/user.service";
import {User} from "../../../types/user";
import {Request} from "../../../types/request";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  // host: {
  //   '(document:click)': 'closeAutocompleteDiv($event)',
  // }
})
export class ConfirmDialogComponent implements OnInit {
  @Input()
  decision!: string;

  @Input()
  request!: Request;

  users: User[]=[];
  assignee!: User;
  profile!: any;

  usersSearchLabel: string[]=['lastName', 'firstName']
  searchTerm: string='';
  filteredResult: User[]=[];
  searchLabel: any;
  @ViewChild('autocomplete') _el!: ElementRef<HTMLDivElement>;

  constructor(protected ref: NbDialogRef<ConfirmDialogComponent>,
              private userService: UserService,private toastr: NbToastrService) {
  }

  cancel() {
    this.ref.close({message: '', assignee: null, cancel: true});
  }


  getAllUsers(){
    if (this.request?.status==="A approuver validateur"){
      this.userService.search({authorities: ["VALIDATOR"], provenance: 'Siège', entite: this.request?.initiator.entite, delagationRegionale: this.request?.initiator.delegationRegionale}).subscribe((res)=>{
        this.users=res.users.map((i: User) => { i.fullname = i.firstName + ' ' + i.lastName; return i; });
      })
    }
    else if (this.request?.status==="A approuver RH"){
      this.userService.search({authorities: ["CELLULE_HABILITATION"]}).subscribe((res)=>{
        this.users=res.users.map((i: User) => { i.fullname = i.firstName + ' ' + i.lastName; return i; });
      })
    }
  }

  getSelectedUser(e: any){
    this.assignee=e;
  }
  search(){
    if (this.request.status==="A approuver RH"){
      this.userService.search({
        authorities: ["CELLULE_HABILITATION"]}).subscribe(({users, totalItems})=>{
        this.users=users;
      })
    }
    else {
      this.userService.search({
        entite: this.profile.entite, authorities: ["VALIDATOR"]}).subscribe(({users, totalItems})=>{
        this.users=users;
      })
    }

  }

  submit(message: string, assignee?: User) {

    if(!(message.length >= 255)){
      // const assignee=this.assignee;
      if(message===null && (this.decision==="rejeter" || "retourner")){
        this.toastr.warning("Error", "Veuillez saisir le motif");
        return;
      }
      if (assignee===null && this.decision==="reaffecter"){
        this.toastr.warning("Error", "Veuillez choisir le nouveau validateur");
        return;
      }
      this.ref.close({message, assignee});
    }else {
      console.log('message has more than 255 characteres :'+message.length)
      this.toastr.warning("Error", "Champ ne doit pas dépasser 255 caractères");
    }

  }

  ngOnInit(): void {
    this.profile=this.userService.getUserProfile();
    this.getAllUsers();
  }

}
