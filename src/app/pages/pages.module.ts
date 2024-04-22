import {NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule} from "@angular/router";
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
} from "@nebular/theme";
import {PagesRoutingModule} from "./pages-routing.module";
import {ThemeModule} from "../@theme/theme.module";
import {HomeComponent} from './home/home.component';
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProgressComponent} from './progress/progress.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {CoreModule} from "../@core/core.module";
import {AppResolver} from "../app.resolver";
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import {NgxPaginationModule} from "ngx-pagination";
import { LinechartComponent } from './home/linechart/linechart.component';
import { Linechart2Component } from './home/linechart2/linechart2.component';
import { Linechart3Component } from './home/linechart3/linechart3.component';
import {LoadingComponent} from "../@theme/components/loading/loading.component";
import { TestComponent } from './test/test.component';
import { InitProjectComponent } from './chefProjet/init-project/init-project.component';
import { ListFournisseurComponent } from './chefProjet/list-fournisseur/list-fournisseur.component';
import { ListProjectsComponent } from './chefProjet/list-projects/list-projects.component';
import { ArticleBordereauxComponent } from './chefProjet/article-bordereaux/article-bordereaux.component';
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
import { ChartModule } from 'angular-highcharts';
import { FournisseurByLotComponent } from './fournisseur-by-lot/fournisseur-by-lot.component';
import { EstimationcoutsComponent } from './acheteur/estimationcouts/estimationcouts.component';
import { ProjetByLotComponent } from './projet-by-lot/projet-by-lot.component';
import { NotationFournisseurComponent } from './notation-fournisseur/notation-fournisseur.component';
import { EvolutionProjetLotComponent } from './evolution-projet-lot/evolution-projet-lot.component';
import { MapComponent } from './map/map.component';
import { MapsModule, LegendService, DataLabelService, MapsTooltipService, MarkerService } from '@syncfusion/ej2-angular-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '../services/keycloak-initializer';
import { ProjetsComponent } from './projets/projets.component';
import { AnotherMapComponent } from './another-map/another-map.component';
import { StatusProjetComponent } from './status-projet/status-projet.component';
import { DivisionBudgetProjetComponent } from './division-budget-projet/division-budget-projet.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProgressComponent,
    NotFoundComponent,
    DeleteConfirmDialogComponent,
    //DynamicFormComponent, 
    FormCreatorComponent,
    LinechartComponent,
    Linechart2Component,
    Linechart3Component,
    DeleteConfirmDialogComponent,
    LoadingComponent,
    LoadingComponent,
    TestComponent,
    InitProjectComponent,
    ListFournisseurComponent,
    ListProjectsComponent,
    ArticleBordereauxComponent,
    LotUniqueComponent,
    LotElectriciteComponent,
    LotClimatisationComponent,
    Projet1Component,
    Projet2Component,
    Projet3Component,
    Projet4Component,
    Projet5Component,
    EstimationCoutComponent,
    EstimationcoutsComponent,
    EstimationArticle1Component,
    ProjetByLotComponent,
    FournisseurByLotComponent,
    NotationFournisseurComponent,
    EvolutionProjetLotComponent,
    MapComponent,
    ProjetsComponent,
    AnotherMapComponent,
    StatusProjetComponent,
    DivisionBudgetProjetComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbRadioModule,
    NbIconModule,
    NbSelectModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    // NbMomentDateModule,
    ReactiveFormsModule,
    ThemeModule,
    CoreModule,
    NbProgressBarModule,
    NbListModule,
    NbButtonGroupModule,
    FormsModule,
    NgxPaginationModule,
    ChartModule,
    MapsModule,
    FontAwesomeModule,
    ThemeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ProgressComponent,
    FormCreatorComponent,
    DeleteConfirmDialogComponent,
    LoadingComponent,
    LoadingComponent
  ],
  providers: [
    DatePipe, AppResolver,LegendService, DataLabelService, MapsTooltipService,MarkerService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [MapComponent]
})
export class PagesModule { 
  }
