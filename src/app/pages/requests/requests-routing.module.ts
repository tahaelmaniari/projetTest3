import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestFormComponent} from "./request-form/request-form.component";
import {RequestListComponent} from "./request-list/request-list.component";
import {RequestReadComponent} from "./request-read/request-read.component";

const routes: Routes = [
  {
    path: 'new',
    component: RequestFormComponent,
  },
  {
    path: 'edit/:id',
    component: RequestFormComponent,
  },
  {
    path: 'tout',
    component: RequestListComponent,
  },
  {

    path: 'en-cours',
    component: RequestListComponent,
  },
  {
    path: 'a-completer',
    component: RequestListComponent,
  },
  {
    path: 'a-valider',
    component: RequestListComponent,

  },
  //todo add path here

  {
    path: 'a-valider-hrbp',
    component: RequestListComponent,
    },
  {
    path: 'a-valider-rh',
    component: RequestListComponent,

  },
  {
    path: 'cloturees',
    component: RequestListComponent,
  },  {
    path: 'rejetees',
    component: RequestListComponent,
  },  {
    path: 'retirees',
    component: RequestListComponent,
  },
  {
    path: 'read/:id',
    component: RequestReadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
