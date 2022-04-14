import { Swipe } from './swipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinderUiService {

  baseUrl = "http://localhost:8080"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  swiped(swipe: Swipe): Observable<Swipe> {
    return this.http.post<Swipe>(`${this.baseUrl}/swipes`, swipe);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
