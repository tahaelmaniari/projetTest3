import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ThemeModule} from "./@theme/theme.module"
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {CoreModule} from "./@core/core.module";
import {Ng2CompleterModule} from "ng2-completer";
import {NgSelectModule} from "@ng-select/ng-select";
import {AppResolver} from "./app.resolver";
@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ThemeModule.forRoot(),
    CoreModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    CoreModule,
    Ng2CompleterModule,
    NgSelectModule,
  ],
  providers: [
    AppResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
