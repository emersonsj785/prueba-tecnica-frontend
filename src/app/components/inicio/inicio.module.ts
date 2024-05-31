import { NgModule } from "@angular/core";
import { InicioRountingModule } from "./inicio.routing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InicioComponent } from "./inicio.component";

@NgModule({
    declarations: [InicioComponent],
    imports: [InicioRountingModule, CommonModule,HttpClientModule, ReactiveFormsModule],
    exports: []
})
export class InicioModule{}
