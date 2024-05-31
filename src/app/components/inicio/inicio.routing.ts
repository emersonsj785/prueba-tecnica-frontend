import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { AuthGuard } from 'src/app/security/auth.guard';
import { TipoDocumentoComponent } from '../tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from '../tipo-contribuyente/tipo-contribuyente.component';
import { EntidadComponent } from '../entidad/entidad.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    component:InicioComponent,
    children: [
      {
        path:'tipo-documento',
        canActivate: [AuthGuard],
        loadChildren:()=>
          import("src/app/components/tipo-documento/tipo-documento.module").then(
            (module)=>module.TipoDocumentoModule
          )
      },
      {
        path:'tipo-contribuyente',
        canActivate: [AuthGuard],
        loadChildren:()=>
          import("src/app/components/tipo-contribuyente/tipo-contribuyente.module").then(
            (module)=>module.TipoContribuyenteModule
          )
      },
      {
        path:'entidad',
        canActivate: [AuthGuard],
        loadChildren:()=>
          import("src/app/components/entidad/entidad.module").then(
            (module)=>module.EntidadModule
          )
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRountingModule { }