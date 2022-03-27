import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';
import { DadosPessoais } from './../dados-pessoais/dados-pessoais.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  create(cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(`${this.baseUrl}/users`, cadastro)
  }

  update(cadastro: DadosPessoais): Observable<DadosPessoais> {
    const url = `${this.baseUrl}/users`
    return this.http.put<DadosPessoais>(url, cadastro);
  }

  delete(): Observable<Cadastro> {
    const url = `${this.baseUrl}/users`
    return this.http.delete<Cadastro>(url);
  }


}

