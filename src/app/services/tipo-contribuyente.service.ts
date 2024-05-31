import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoContribuyente } from '../models/TipoContribuyente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {

  private baseEndpoint = 'http://localhost:8080/api/tipo-contribuyentes';

  constructor(private http: HttpClient) { }

  public listar(): Observable<TipoContribuyente[]>{
    return this.http.get<TipoContribuyente[]>(this.baseEndpoint);
  }

  public ver(id: number): Observable<TipoContribuyente>{
    return this.http.get<TipoContribuyente>(`${this.baseEndpoint}/${id}`);
  }

  public crear(tipoContribuyente: TipoContribuyente): Observable<TipoContribuyente>{
    return this.http.post<TipoContribuyente>(this.baseEndpoint, tipoContribuyente);
  }

  public editar(tipoContribuyente: TipoContribuyente): Observable<TipoContribuyente>{
    return this.http.put<TipoContribuyente>(`${this.baseEndpoint}/${tipoContribuyente.id}`,
    tipoContribuyente);
  }

  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }


}
