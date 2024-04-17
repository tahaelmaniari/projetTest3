import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRefListComponent } from './app-ref-list/app-ref-list.component';
import { AppRefFormComponent } from './app-ref-form/app-ref-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule
} from "@nebular/theme";
import {NgxPaginationModule} from "ngx-pagination";
import {ApplicationsRefRoutingModule} from "./applications-ref-routing.module";



@NgModule({
  declarations: [
    AppRefListComponent,
    AppRefFormComponent
  ],
    imports: [
        ApplicationsRefRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        NbInputModule,
        NbButtonModule,
        NgxPaginationModule,
        NbCardModule,
        NbIconModule,
        NbSelectModule,
        FormsModule
    ]
})
export class ApplicationsRefModule { }
