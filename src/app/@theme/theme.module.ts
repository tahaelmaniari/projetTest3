import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
    CORPORATE_THEME,
    COSMIC_THEME, DARK_THEME,
    DEFAULT_THEME,
    NbActionsModule, NbButtonModule,
    NbContextMenuModule, NbIconModule,
    NbLayoutModule,
    NbSearchModule,
    NbSidebarModule, NbThemeModule,
    NbUserModule
} from "@nebular/theme";



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    LayoutComponent
  ],
    imports: [
        CommonModule,
        NbLayoutModule,
        NbSidebarModule,
        NbActionsModule,
        NbContextMenuModule,
        NbUserModule,
        NbSearchModule,
        NbIconModule,
        NbButtonModule
    ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        [NbThemeModule.forRoot(
          {
            name: 'sg',
          },
        ).providers],
      ],
    };
  }
}
