import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.apiURL

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avatars`, {responseType:'blob'});
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

}
