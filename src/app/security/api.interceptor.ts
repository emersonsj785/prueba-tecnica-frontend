import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor{
    constructor (private router : Router){}
    //req-> request back, next-> response back
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("/api")){
            const token = localStorage.getItem("token");
            if(token){
                req=req.clone({setHeaders:{
                    Authorization: "Bearer "+ token
                }})
            }
        }
        console.log("dentross");
        
        return next.handle(req).pipe(tap({
            next:(event) => {},error:(error) => {
                if(error.status==403){
                    localStorage.removeItem("token");
                    this.router.navigate(["/login"]);
                }
            }
        }))
    }
}
