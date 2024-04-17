import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRefListComponent } from './templates-ref-list/templates-ref-list.component';
import { TemplatesRefFormComponent } from './templates-ref-form/templates-ref-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule
} from "@nebular/theme";
import {NgxPaginationModule} from "ngx-pagination";
import {TemplatesRoutingModule} from "./templates-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";



@NgModule({
  declarations: [
    TemplatesRefListComponent,
    TemplatesRefFormComponent
  ],
    imports: [
        CommonModule,
        TemplatesRoutingModule,
        ReactiveFormsModule,
        NbInputModule,
        NbSelectModule,
        NbButtonModule,
        NbCardModule,
        NbIconModule,
        NgxPaginationModule,
        NgSelectModule
    ]
})
export class TemplatesRefModule { }
