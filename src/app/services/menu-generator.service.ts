import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {NbIcon, NbMenuItem} from "@nebular/theme";
import {Observable, of} from "rxjs";
import {NbIconConfig} from "@nebular/theme/components/icon/icon.component";

@Injectable({
  providedIn: 'root'
})
export class MenuGeneratorService {

  constructor(private userService: UserService) { }
  getMenuItems(): Observable<NbMenuItem[]> {
    let authorities = this.userService.getUserProfile().roles;
    let items: NbMenuItem[]=[];
    if(authorities){
      items= [
        ...this.pilotageMenuItem(authorities),
        ...this.initiatorMenuItems(authorities),
        ...this.approbateurMenuItems(authorities),
        ...this.finalMenuItems(authorities),
        ...this.usersMenuItems(authorities),
        ... this.refMenuItems(authorities)


      ]
    }

    return of(items);
  }

  pilotageMenuItem=(authorities: string | string[]): NbMenuItem[] =>{
    if(authorities.includes("PILOTAGE")){
      let mt: NbMenuItem={
        title: 'Pilotage',
        icon: {
          icon: 'chart-line',
          pack: 'fas',
        },
        children: [],
      }
      mt.children?.push({
        title: 'Tableau de bord',
        icon: '',
        link: '/pages/pilotage'
      },{
        title: 'Toutes les demandes',
        icon: '',
        link: '/pages/demandes/tout'
      })
      return [mt]
    }
    return [];
  }
  usersMenuItems = (authorities: string | string[]): NbMenuItem[] => {
    if (authorities.includes('ADMIN_FONC')) {
      return  [
            { title: "Gestion des Utilisateurs", icon: "users", link: "/pages/users"
            }
          ]
    }
    return []
  }

refMenuItems=(authorities: string): NbMenuItem[]=>{
  if (authorities.includes('ADMIN_FONC')) {
    let ref: NbMenuItem= {
      title: "Gestion des reférentiels",
      icon: "gears",
      children: []
    };

    ref.children?.push({
      title: "applications",
      icon: {
        icon: 'shapes',
        pack: 'fas'
      },
      link: "/pages/applications"
    }/*, {
      title: "templates",
      icon: {
        icon: 'file-lines',
        pack: 'fas'
      },
      link: "/pages/templates"
    }*/, {
      title: "types-demandes",
      icon: {
        icon: 'chevron-right',
        pack: 'fas'
      },
      link: "/pages/types-demandes"
    },
      {
        title: "dynamic-form",
        icon: {
          icon: 'file-lines',
          pack: 'fas'
        },
        link: "/pages/dynamic-form"
      }
    )
  return  [ref];
  }
  return [];
}

  initiatorMenuItems=(authorities: string | string[])=> {
    if (authorities.includes('INITIATOR')) {
      let mt: NbMenuItem = {
        title: "INITIATION",
        icon: 'plus',
        children: [],
        expanded: true,
      };


      mt.children?.push({
          title: "Nouvelle demande",
          link: "/pages/demandes/new"
        },
        {
          title: "A completer",
          link: "/pages/demandes/a-completer"
        });
      return [mt];
    }
    return [];


  }
  approbateurMenuItems=(authorities: string | string[])=>{
    if (authorities.includes('INITIATOR') ||authorities.includes('VALIDATOR') || authorities.includes("CELLULE_HABILITATION")){
      let mt: NbMenuItem={
        title: "VALIDATION",
        children: [],
        icon: 'chalkboard-user',
        expanded: true,
      };
      if (authorities.includes('VALIDATOR')){
        mt.children?.push({
          title: "A valider",
          link: "/pages/demandes/a-valider"
        });
      }
      if (authorities.includes("CELLULE_HABILITATION")){
        mt.children?.push({
            title: "A valider CH",
            link: "/pages/demandes/a-valider-rh"
          },
          {
            title: "Demandes en cours",
            link: "/pages/demandes/en-cours"
          });
      }
      if (authorities.includes("HRBP")){
        mt.children?.push({
            title: "A valider HRBP",
            link: "/pages/demandes/a-valider-hrbp"
          },
        );
      }
      if (!authorities.includes('CELLULE_HABILITATION') && (authorities.includes('INITIATOR')|| authorities.includes('VALIDATOR'))){
        mt.children?.push({
          title: "Mes demandes en cours",
          link: "/pages/demandes/en-cours"
        })
      }
      return [mt]
    }

    return [];

  }

  finalMenuItems=(authorities: string | string[])=>{
    if (authorities.includes("INITIATOR") || authorities.includes("VALIDATOR") || authorities.includes("CELLULE_HABILITATION")){
      let mt: NbMenuItem={
        title: "Demandes traitées",
        children: [],
        icon: "check",
        expanded: true,
      };
      mt.children?.push(
        {
          title: "Cloturées",
          link: "/pages/demandes/cloturees"
        },{
          title: "Retirées",
          link: "/pages/demandes/retirees"
        },{
          title: "Rejetées",
          link: "/pages/demandes/rejetees"
        });
      return [mt];
    }
    return [];
  }

}
