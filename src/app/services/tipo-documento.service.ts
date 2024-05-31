import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/TipoDocumento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private baseEndpoint = 'http://localhost:8080/api/tipo-documentos';

  constructor(private http: HttpClient) { }

  public listar(): Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(this.baseEndpoint);
  }

  public ver(id: number): Observable<TipoDocumento>{
    return this.http.get<TipoDocumento>(`${this.baseEndpoint}/${id}`);
  }

  public crear(tipoDocumento: TipoDocumento): Observable<TipoDocumento>{
    return this.http.post<TipoDocumento>(this.baseEndpoint, tipoDocumento);
  }

  public editar(tipoDocumento: TipoDocumento): Observable<TipoDocumento>{
    return this.http.put<TipoDocumento>(`${this.baseEndpoint}/${tipoDocumento.id}`,
    tipoDocumento);
  }

  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }

}
