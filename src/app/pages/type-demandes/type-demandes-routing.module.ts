import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypeDemandesListComponent} from "./type-demandes-list/type-demandes-list.component";
import {TypeDemandesFormComponent} from "./type-demandes-form/type-demandes-form.component";

const routes: Routes = [
  {
    path: '',
    component: TypeDemandesListComponent,
  },
  {
    path: 'form',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeDemandesRoutingModule { }
