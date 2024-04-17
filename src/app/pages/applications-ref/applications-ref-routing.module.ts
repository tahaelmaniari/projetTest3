import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppRefListComponent} from "./app-ref-list/app-ref-list.component";
import {AppRefFormComponent} from "./app-ref-form/app-ref-form.component";

const routes: Routes = [
  {
    path: '',
    component: AppRefListComponent
  },
  {
    path: 'form',
    component: AppRefFormComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRefRoutingModule { }
