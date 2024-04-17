import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicFormComponent} from "./dynamic-form.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule, NbWindowModule
} from "@nebular/theme";
import {DynamicFormRoutingModule} from "./dynamic-form-routing.module";
import {FormCreatorComponent} from "../form-creator/form-creator.component";
import {PagesModule} from "../pages.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [DynamicFormComponent
  ],
    imports: [
        CommonModule,
        NbCardModule,
        DynamicFormRoutingModule,
        PagesModule,
        NbInputModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbRadioModule,
        NgSelectModule,
        NbSelectModule,
        NbIconModule,
        NgxPaginationModule,
        NbTooltipModule,
        NbWindowModule
    ]
})
export class DynamicFormModule { }
