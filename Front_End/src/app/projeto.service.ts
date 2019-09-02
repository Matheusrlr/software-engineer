import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projetos } from './projetos/projeto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }

  getProjeto(): Observable<Projetos[]> {
    return this.http.get<Projetos[]>('http://localhost:8001/projeto');
  }

  atualizarProjeto(projeto: Projetos): Observable<any> {
    return this.http.put('http://localhost:8001/projeto/',projeto,httpOptions);
  }

  apagarProjeto(projeto: Projetos): Observable<any> {
    return this.http.delete('http://localhost:8001/projeto/'+ projeto.projeto);
  }

  adicionar(projeto: Projetos): Observable<any> {
    return this.http.post('http://localhost:8001/projeto', projeto, httpOptions);
  }
}
