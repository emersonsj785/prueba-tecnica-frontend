import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { EntidadComponent } from "./entidad.component";
import { EntidadRoutingModule } from "./entidad.routing";

@NgModule({
    declarations: [EntidadComponent],
    imports: [EntidadRoutingModule, CommonModule,HttpClientModule, ReactiveFormsModule],
    exports: []
})
export class EntidadModule{}