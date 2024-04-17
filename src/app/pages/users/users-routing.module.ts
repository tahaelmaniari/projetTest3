import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'new',
    component: UserFormComponent,
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
