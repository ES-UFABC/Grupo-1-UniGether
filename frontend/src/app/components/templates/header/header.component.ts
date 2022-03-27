import { AuthService } from './../../../_services/auth.service';
import { TokenStorageService } from './../../../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  email?: string;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();


    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.email = user.email;

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
