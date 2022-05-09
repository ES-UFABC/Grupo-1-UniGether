import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CadastroService } from '../cadastro/cadastro.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  image: any;
  cadastro = new Profile();
  isLoggedIn = false;
  currentUser: any;
  decoded: any;

  base_url: string = `${environment.apiURL}/avatars`

  constructor(private tokenStorage: TokenStorageService,private cadastroService: CadastroService, private profileService: ProfileService, private router: Router, private route: ActivatedRoute){ }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.cadastroService.readById(this.decoded.id).subscribe(cadastro => {
        this.cadastro = cadastro;
      });
      this.profileService.getFiles().subscribe(file => {
        this.image = this.createImage(file);
      });
    }
  }

  private handleImageRetrievalError(err: Error) {
    console.error(err);
    this.profileService.showMessage("Problem retrieving profile photo.");
  }

  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.image = reader.result;
      }, false);

      reader.readAsDataURL(image);
    }
  }

}
