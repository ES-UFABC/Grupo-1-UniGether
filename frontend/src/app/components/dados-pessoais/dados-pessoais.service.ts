import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DadosPessoaisService {

  baseUrl = environment.apiURL

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  uploadfile(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/avatars`, formData)
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avatars`);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

}
