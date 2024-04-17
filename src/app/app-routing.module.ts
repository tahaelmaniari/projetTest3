import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppResolver} from "./app.resolver";
const routes: Routes = [
  {
  path: 'pages',
  loadChildren: () => import('./pages/pages.module')
    .then(m => m.PagesModule),
  resolve: {
    initialData: AppResolver
  }
},
  { path: '', redirectTo: 'pages/pilotage', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule],
  providers: [AppResolver]
})
export class AppRoutingModule { }
