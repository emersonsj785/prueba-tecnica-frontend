import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login.routing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LoginComponent],
    imports: [LoginRoutingModule, CommonModule,HttpClientModule, ReactiveFormsModule],
    exports: []
})
export class LoginModule{}
