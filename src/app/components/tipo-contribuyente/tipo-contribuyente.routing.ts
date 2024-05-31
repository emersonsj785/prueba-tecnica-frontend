import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoContribuyenteComponent } from './tipo-contribuyente.component';

const routes: Routes = [
  {
    path:'',
    component:TipoContribuyenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoContribuyenteRoutingModule { }