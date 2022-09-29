import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from './Candidato';


const httpOptions = {
 headers: new HttpHeaders({
  'Content-Type': 'application/json'
 })

};

@Injectable({
  providedIn: 'root'
})

export class CandidatosService {

  url = 'https://localhost:7164/api/candidatos';


  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Candidato[]>
  {
    return this.http.get<Candidato[]>(this.url);
  }
   
  PegarPeloId(candidatoId : number): Observable<Candidato>{

    const apiUrl = `${this.url}/${candidatoId}`;
    return this.http.get<Candidato>(apiUrl);
  }

  SalvarCandidato(candidato: Candidato): Observable<any>{
    return this.http.post<Candidato>(this.url, candidato, httpOptions);
  }

  AtualizarCandidato(candidato : Candidato) :Observable<any>
  {
    return this.http.put<Candidato>(this.url, candidato, httpOptions);
  }

  ExcluirCandidato(candidatoId: Number) : Observable<any>{
    const apiUrl = `${this.url}/${candidatoId}`;
    return this.http.delete<number>(apiUrl, httpOptions)
  }
}
