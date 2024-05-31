import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TipoContribuyenteComponent } from "./tipo-contribuyente.component";
import { TipoContribuyenteRoutingModule } from "./tipo-contribuyente.routing";

@NgModule({
    declarations: [TipoContribuyenteComponent],
    imports: [TipoContribuyenteRoutingModule, CommonModule,HttpClientModule, ReactiveFormsModule],
    exports: []
})
export class TipoContribuyenteModule{}