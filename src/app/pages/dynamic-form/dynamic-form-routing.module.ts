import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicFormComponent} from "./dynamic-form.component";
import {RouterModule, Routes} from "@angular/router";
import {FormCreatorComponent} from "../form-creator/form-creator.component";




const routes: Routes = [
  {
    path: '',
    component: DynamicFormComponent,
  },
  {
    path: '/form-creation',
    component: FormCreatorComponent,
  },

];

@NgModule({

  imports: [

    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
