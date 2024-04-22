import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import { TestComponent } from './test/test.component';
import { ListFournisseurComponent } from './chefProjet/list-fournisseur/list-fournisseur.component';
import { InitProjectComponent } from './chefProjet/init-project/init-project.component';
import { LotUniqueComponent } from './fournisseur/lot/lot-unique/lot-unique.component';
import { LotElectriciteComponent } from './fournisseur/lot/lot-electricite/lot-electricite.component';
import { LotClimatisationComponent } from './fournisseur/lot/lot-climatisation/lot-climatisation.component';
import { Projet1Component } from './fournisseur/projets/projet1/projet1.component';
import { Projet2Component } from './fournisseur/projets/projet2/projet2.component';
import { Projet3Component } from './fournisseur/projets/projet3/projet3.component';
import { Projet4Component } from './fournisseur/projets/projet4/projet4.component';
import { Projet5Component } from './fournisseur/projets/projet5/projet5.component';
import { EstimationCoutComponent } from './fournisseur/estimation-cout/estimation-cout.component';
import { EstimationArticle1Component } from './acheteur/estimation-article1/estimation-article1.component';
import { ProjetByLotComponent } from './projet-by-lot/projet-by-lot.component';
import { EvolutionProjetLotComponent } from './evolution-projet-lot/evolution-projet-lot.component';
import { MapComponent } from './map/map.component';
import { ProjetsComponent } from './projets/projets.component';
import { AnotherMapComponent } from './another-map/another-map.component';
import { FournisseursComponent } from './projets/fournisseurs/fournisseurs.component';
import { StatusProjetComponent } from './status-projet/status-projet.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'pilotage',
        component: HomeComponent,
      },
      {
        path: 'list-fournisseur',
        component: ListFournisseurComponent,
      },
      {
        path:'status-projet',component:StatusProjetComponent
      },
      {
        path: 'projets',
        component: ProjetsComponent,
      },
      {
        path: 'projets/:status/:nombreProjet',
        component: ProjetsComponent,
      },
      {
        path: 'projets/:nombreFournisseur/:typeFournisseur/projetSelected',
        component: FournisseursComponent,
      },
      {
        path: 'another-map',
        component: AnotherMapComponent,
      },
      {
        path: 'list-fournisseur-projet1',
        component: Projet1Component,
      },
      {
        path: 'estimation-cout',
        component: EstimationCoutComponent,
      },
      {
        path: 'list-fournisseur-projet2',
        component: Projet2Component,
      },
      {
        path: 'list-fournisseur-projet3',
        component: Projet3Component,
      },
      {
        path: 'list-fournisseur-projet4',
        component: Projet4Component,
      },
      {
        path: 'list-fournisseur-projet5',
        component: Projet5Component,
      },
      {
        path: 'init-project',
        component: InitProjectComponent,
      },
      {
        path: 'lot-unique',
        component: LotUniqueComponent,
      },
      {
        path: 'lot-electricite',
        component: LotElectriciteComponent,
      },
      {
        path: 'lot-climatisation',
        component: LotClimatisationComponent,
      },
      {
        path:'estimation-article1',
        component:EstimationArticle1Component
      },
      {
        path: 'demandes',
      },
      {
        path: 'users',
      },
      {
        path:'chart',component:ProjetByLotComponent
      },
      {
        path:'test',component:TestComponent
      },
      {
        path: 'applications',
      },
      {
        path: 'templates',
      },
      {
        path: 'types-demandes',
      },
      {
        path: 'dynamic-form',
      },
      {
        path: 'barchart',component:EvolutionProjetLotComponent
      },
      {
        path: 'map',component:MapComponent
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
