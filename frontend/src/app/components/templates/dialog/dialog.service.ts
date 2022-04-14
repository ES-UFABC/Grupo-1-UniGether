import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }

  postGroup(data: any, user_id: number) {
    return this.http.post<any>(`http://localhost:8080/groups/${user_id}`, data);
  }
  getGroup() {
    return this.http.get<any>("http://localhost:8080/groups");
  }
}
