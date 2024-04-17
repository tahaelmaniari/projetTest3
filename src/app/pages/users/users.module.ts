import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import {UsersRoutingModule} from "./users-routing.module";
import {
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule, NbRadioModule,
    NbSelectModule, NbWindowModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    UserFormComponent,
    UsersListComponent
  ],
    imports: [
        UsersRoutingModule,
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbDialogModule.forChild(),
        NbWindowModule.forChild(),
        ReactiveFormsModule,
        NbRadioModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class UsersModule { }
