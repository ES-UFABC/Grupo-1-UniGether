import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from './events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Events[]>{
    return this.http.get<Events[]>(`${this.baseUrl}/events`)
  }

  postEvent(event: Events): Observable<Events>{
    return this.http.post<Events>(`${this.baseUrl}/events`, event)
  }
}