import { Group } from './group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebchatService {

  baseUrl = environment.apiURL

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  readById(user_id: string): Observable<Group[]> {
    const url = `${this.baseUrl}/groups/user/${user_id}`
    return this.http.get<Group[]>(url);
  }

  delete(user_id: number, id: number): Observable<Group> {
    const url = `${this.baseUrl}/groups/${id}/user/${user_id}`
    return this.http.delete<Group>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
