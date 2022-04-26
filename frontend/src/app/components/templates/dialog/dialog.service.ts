import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }

  postGroup(data: any) {
    return this.http.post<any>(`http://localhost:8080/groups`, data);
  }
  getGroup() {
    return this.http.get<any>("http://localhost:8080/groups");
  }

  putGroup(data: any, id: number) {
    return this.http.put<any>("http://localhost:8080/groups/" + id, data);
  }
  deleteGroup(id: number) {
    return this.http.delete<any>("http://localhost:8080/groups/" + id);
  }

  addUserInGroup(id: number, user_id: number) {
    return this.http.post("http://localhost:8080/groups/" + id + "/user/" + user_id, null);
  }

  removeUserInGroup(id: number, user_id: number) {
    return this.http.delete<any>("http://localhost:8080/groups/" + id + "/user/" + user_id);
  }

  removeGroup(id: number) {
    return this.http.delete<any>("http://localhost:8080/groups/" + id);
  }
}
