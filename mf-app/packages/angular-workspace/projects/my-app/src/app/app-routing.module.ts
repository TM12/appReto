import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentLibraryComponent } from 'component-library';
import { BuildInfoComponent } from './build-info/build-info.component';

const routes: Routes = [
  { path:'crud',component:BuildInfoComponent},
  { path: '', pathMatch: 'full', redirectTo: 'crud' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
