import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeDemandesRoutingModule } from './type-demandes-routing.module';
import { TypeDemandesListComponent } from './type-demandes-list/type-demandes-list.component';
import { TypeDemandesFormComponent } from './type-demandes-form/type-demandes-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    TypeDemandesListComponent,
    TypeDemandesFormComponent
  ],
  imports: [
    CommonModule,
    TypeDemandesRoutingModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NgxPaginationModule,
    NbSelectModule
  ]
})
export class TypeDemandesModule { }
