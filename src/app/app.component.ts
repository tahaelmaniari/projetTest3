import { Component } from '@angular/core';
import {NbIconLibraries} from "@nebular/theme";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demandes d\'habilitations';
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('fas');
  }
}
