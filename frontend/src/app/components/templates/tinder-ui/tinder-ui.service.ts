import { Swipe } from './swipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TinderUiService {

  baseUrl = environment.apiURL

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  swiped(swipe: Swipe): Observable<Swipe> {
    return this.http.post<Swipe>(`${this.baseUrl}/matches`, swipe);
  }
  
  gone(user_id: number): Observable<Swipe[]> {
    return this.http.get<Swipe[]>(`${this.baseUrl}/matches/swipes/${user_id}`);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
