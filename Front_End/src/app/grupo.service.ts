import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupos } from './grupos/grupo';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  getGrupo(): Observable<Grupos[]> {
    return this.http.get<Grupos[]>('http://localhost:8001/grupo');
  }

  atualizarGrupo(grupo: Grupos): Observable<any> {
    return this.http.put('http://localhost:8001/grupo/', grupo, httpOptions);
  }

  apagarGrupo(grupo: Grupos): Observable<any> {
    return this.http.delete('http://localhost:8001/grupo/' + grupo.nome);
  }

  adicionar(grupo: Grupos): Observable<any> {
    return this.http.post('http://localhost:8001/grupo', grupo, httpOptions);
  }
}
