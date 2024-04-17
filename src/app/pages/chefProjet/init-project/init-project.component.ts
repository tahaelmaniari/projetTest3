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
  projet! : string
  files: File[] = [];

   children = this.files.map(file => ({
    title: file,
    link: '/pages/' + file.name.toLowerCase().replace(/\s+/g, '-')
}));



  constructor(private toastr : NbToastrService,private router : Router){
  }
  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
  this.files = Array.from(event.target.files);
  }
 
  upload(): void {
  console.log(this.files); 
  }




  addProjet():void{
    if(this.projet == '' || this.files.length == 0)
      this.toastr.danger('Veuillez saisir tous les informations ', "Error", {duration: 10000})
    else{
      const projets = MENU_ITEMS.find(i => i.title == 'Projets')
      if(projets)
        {
          projets.children?.push(      {
            title: this.projet,
            icon: 'list-outline',
            expanded: true,
            children: [
              {
                title: "Lot Unique",
                icon: 'star',
                link: "/pages/lot-unique"
              },
              {
                title: 'Lot Electricite',
                link: "/pages/lot-electricite",
                icon: 'star',
              },
              {
                title: 'Lot Climatisation',
                link: '/pages/lot-climatisation',
                icon: 'star',
              },
              {
                title: 'Fournisseur',
                link: '/pages/list-fournisseur-projet1',
                icon: 'star',
              },
              {
                title: 'Documents',
                link: '/pages/list-fournisseur-projet1',
                icon: 'star',
                children: this.files.map(file => ({
                  title: file.name,
                  link: '/pages/' + file.name.toLowerCase().replace(/\s+/g, '-'),
                  icon:'star'
              }))
              },
            ],
          },)
        }
      this.toastr.success('Les données projets sont bien ajoutés ', "Success", {duration: 10000})
      this.router.navigate(['/pages/pilotage']);
    }
  }

}
