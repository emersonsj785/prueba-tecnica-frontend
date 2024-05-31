import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TipoDocumentoRoutingModule } from "./tipo-documento.routing";
import { TipoDocumentoComponent } from "./tipo-documento.component";

@NgModule({
    declarations: [TipoDocumentoComponent],
    imports: [TipoDocumentoRoutingModule, CommonModule,HttpClientModule, ReactiveFormsModule],
    exports: []
})
export class TipoDocumentoModule{}