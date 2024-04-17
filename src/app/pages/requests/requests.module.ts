import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import {RequestListComponent} from "./request-list/request-list.component";
import {RequestFormComponent} from "./request-form/request-form.component";
import {RequestReadComponent} from "./request-read/request-read.component";
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbPopoverModule, NbRadioModule,
  NbSelectModule, NbSpinnerModule, NbStepperModule, NbTooltipModule
} from "@nebular/theme";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DndDirective} from "./request-form/dnd.directive";
import {PagesModule} from "../pages.module";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {NgxPaginationModule} from "ngx-pagination";
import { RequestSmartTableComponent } from './request-smart-table/request-smart-table.component';
import { FilterPipe } from './filter.pipe';
import {CoreModule} from "../../@core/core.module";
import {AutocompleteModule} from "../../@core/autocomplete/autocomplete.module";
import {Ng2CompleterModule} from "ng2-completer";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
    declarations: [
        RequestListComponent,
        RequestFormComponent,
        RequestReadComponent,
        DndDirective,
        ConfirmDialogComponent,
        RequestSmartTableComponent,
        FilterPipe,
    ],
    imports: [
        CommonModule,
        RequestsRoutingModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ReactiveFormsModule,
        NbInputModule,
        NbDatepickerModule,
        NgxPaginationModule,
        NbStepperModule,
        NbTooltipModule,
        PagesModule,
        FormsModule,
        NbPopoverModule,
        NbAutocompleteModule,
        CoreModule,
        AutocompleteModule,
        NbSelectModule,
        Ng2CompleterModule,
        PdfViewerModule,
        NgSelectModule,
        NbCheckboxModule,
        NbSpinnerModule,
        NbRadioModule
    ],
    providers: [
        FormBuilder
    ],
  exports: [
    RequestListComponent,
    RequestSmartTableComponent
  ]
})
export class RequestsModule { }
