import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import {FormsModule} from "@angular/forms";
import {NbInputModule} from "@nebular/theme";

const publicApi = [
  AutocompleteComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule
  ],
  declarations: [publicApi],
 // exports: [publicApi]
})
export class AutocompleteModule {
}
