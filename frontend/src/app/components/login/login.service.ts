import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.apiURL

  constructor() { }

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
}
