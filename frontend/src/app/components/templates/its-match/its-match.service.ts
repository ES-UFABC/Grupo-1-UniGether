import { IItsMatch } from './itsmatch.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  baseUrl = environment.apiURL

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  getMatch(user_id1: string): Observable<IItsMatch[]> {
    const url = `${this.baseUrl}/matches/${user_id1}`
    return this.http.get<IItsMatch[]>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
