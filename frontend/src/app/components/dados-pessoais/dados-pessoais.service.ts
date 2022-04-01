import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosPessoaisService {

  baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  uploadfile(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file.name);
    return this.http.post(`${this.baseUrl}/avatars`, formData)
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avatars`);
  }

}
