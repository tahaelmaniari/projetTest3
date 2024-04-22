import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import { MENU_ITEMS } from '../../pages-menu';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  expanded?: boolean;
  children?: NbMenuItem[];
}
@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.css']
})
export class InitProjectComponent implements OnInit {
    code!: number
    nom! : string
    etat! : string
    budget!:string
    nombreFournisseur!: number
  files: File[] = [];

   children = this.files.map(file => ({
    title: file,
    link: '/pages/' + file.name.toLowerCase().replace(/\s+/g, '-')
}));



  constructor(private toastr : NbToastrService,private router : Router){
  }
  ngOnInit(): void {
    console.log(this.nom)
  }
  onFileSelected(event: any): void {
  this.files = Array.from(event.target.files);


  }
 
  upload(): void {
  console.log(this.files); 
  }


validation()
{
  if(this.code == null || this.nom == null || this.etat == null || this.budget == null)
    return false;
  return true;
}

  addProjet():void{
    if(!this.validation())
      this.toastr.danger('Veuillez saisir tous les informations ', "Error", {duration: 10000})
    else{
      this.toastr.success('Les données projets sont bien ajoutés ', "Success", {duration: 10000})
      //this.router.navigate(['/pages/pilotage']);
    }
  }
  }

