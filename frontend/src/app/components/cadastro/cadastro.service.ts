import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DadosPessoais } from './../dados-pessoais/dados-pessoais.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  baseUrl = environment.apiURL

  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }

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

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  readById(id: string): Observable<DadosPessoais> {
    const url = `${this.baseUrl}/users/${id}`
    return this.http.get<DadosPessoais>(url);
  }

  readUsers(): Observable<DadosPessoais[]> {
    const url = `${this.baseUrl}/users`
    return this.http.get<DadosPessoais[]>(url);
  }
}

