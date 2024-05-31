import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entidad } from '../models/Entidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  private baseEndpoint = 'http://localhost:8080/api/entidades';

  constructor(private http: HttpClient) { }

  public listar(): Observable<Entidad[]>{
    return this.http.get<Entidad[]>(this.baseEndpoint);
  }

  public ver(id: number): Observable<Entidad>{
    return this.http.get<Entidad>(`${this.baseEndpoint}/${id}`);
  }

  public crear(entidad: Entidad): Observable<Entidad>{
    return this.http.post<Entidad>(this.baseEndpoint, entidad);
  }

  public editar(entidad: Entidad): Observable<Entidad>{
    return this.http.put<Entidad>(`${this.baseEndpoint}/${entidad.id}`,
    entidad);
  }

  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }


}
