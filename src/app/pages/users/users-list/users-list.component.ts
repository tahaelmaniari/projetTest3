import {Component, OnInit} from '@angular/core';
import {User} from "../../../types/user";
import {Router} from "@angular/router";
import {NbToastrService, NbWindowControlButtonsConfig, NbWindowService} from "@nebular/theme";
import {UserFormComponent} from "../user-form/user-form.component";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[]=[];
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  currentIndex = -1;
  matricule: string="";
  selectedAuthorities: string[]=[];
  authorities: string[]=['INITIATOR', 'VALIDATOR', 'CELLULE_HABILITATION', 'ADMIN_FONC', 'PILOTAGE'];
  delegationRegionale: string="";
  entite: string="";
  provenance: string="";
  email: string="";
  firstname: string="";
  lastname: string="";
  provenances: string[]=['Réseau', 'Siège']
  fonction: string='';

  constructor(private router: Router,
              private nbWindowService: NbWindowService,
              private toastr: NbToastrService) { }

  getAllUsers(){
    const user: User={ enabled: true, id: "",
      matricule: this.matricule,
      authorities: this.selectedAuthorities,
      delegationRegionale: this.delegationRegionale,
      provenance: this.provenance,
      //todo replace with appropriate value
      fonction:this.fonction,
      email: this.email,
      lastName: this.lastname,
      firstName: this.firstname,
      entite: this.entite
    }
    const params=this.getRequestParams(this.page, this.pageSize);
   /* this.userService.search(user, params).subscribe(({users, totalItems})=>{
      this.users=users;
      this.count=totalItems;
    },(err)=>{
      this.toastr.danger(err.error.message, "Erreur", {duration: 10000})
    })*/
  }

  open(isEdit: boolean, e?: User){
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
      close: true,
    };
    this.nbWindowService.open(UserFormComponent, {title: "Ajouter un utilisateur", buttons: buttonsConfig, context: {isEdit: isEdit, user: e}})
  }


  ngOnInit(): void {
    this.getAllUsers();
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getAllUsers();
  }

  handlePageSizeChange(value: any): void {
    this.pageSize = value;
    this.page = 1;
    this.getAllUsers();
  }

  isMoreThanTen(){
    return this.users?.length>=10
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
