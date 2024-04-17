import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TemplatesRefFormComponent} from "./templates-ref-form/templates-ref-form.component";
import {TemplatesRefListComponent} from "./templates-ref-list/templates-ref-list.component";

const routes: Routes = [
  {
    path: '',
    component: TemplatesRefListComponent,
  },
  {
    path: 'form',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
