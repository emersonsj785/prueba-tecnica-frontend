import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseEndpoint = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  public login(login: Login): Observable<Login>{
    return this.http.post<Login>(`${this.baseEndpoint}`, login);
  }
}
