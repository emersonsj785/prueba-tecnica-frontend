import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>
    import("src/app/components/login/login.module").then(
      (module)=>module.LoginModule
    )
  },
  {
    path:'inicio',
    loadChildren:()=>
    import("src/app/components/inicio/inicio.module").then(
      (module)=>module.InicioModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
