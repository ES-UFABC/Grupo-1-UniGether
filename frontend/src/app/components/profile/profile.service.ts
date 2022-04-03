import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = "http://localhost:8080"

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
