import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private fb:FormBuilder, private router:Router) {}

  form=this.fb.group({
    username: [null, Validators.required],
    contrasenia: [null, Validators.required]
  })
  ngOnInit(): void {
  }

  public login (){
    let login = this.form.value;

    this.loginService.login(login).subscribe(data=>{
      localStorage.setItem("token", data.token);
      this.router.navigate(["/inicio"]);
    })
  }
}
