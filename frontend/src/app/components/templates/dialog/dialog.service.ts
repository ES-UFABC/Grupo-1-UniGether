import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiURL
  postGroup(data: any) {
    return this.http.post<any>(this.baseUrl+"/groups", data);
  }
  getGroup(user_id:number) {
    return this.http.get<any>(this.baseUrl+"/groups/opened/"+user_id);
  }

  putGroup(data: any, id: number) {
    return this.http.put<any>(this.baseUrl+"/groups/" + id, data);
  }
  deleteGroup(id: number) {
    return this.http.delete<any>(this.baseUrl+"/groups/" + id);
  }

  addUserInGroup(id: number, user_id: number) {
    return this.http.post(this.baseUrl+"/groups/" + id + "/user/" + user_id, null);
  }

  removeUserInGroup(id: number, user_id: number) {
    return this.http.delete<any>(this.baseUrl+"/groups/" + id + "/user/" + user_id);
  }

  removeGroup(id: number) {
    return this.http.delete<any>(this.baseUrl+"/groups/" + id);
  }
}
