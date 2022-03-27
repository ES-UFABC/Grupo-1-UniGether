import { DadosPessoais } from './dados-pessoais.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from './../cadastro/cadastro.service';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {

  isLoggedIn = false;
  currentUser: any;
  decoded: any;
  cadastro = new DadosPessoais();

  constructor(private tokenStorage: TokenStorageService, private cadastroService: CadastroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
    }
  }

  file:'any';

  updateUser(): void {
    this.cadastroService.update(this.cadastro).subscribe(() => {
      this.logout();
      this.router.navigate(["/login"])
    })
  }

  deleteUser(): void {
    this.cadastroService.delete().subscribe(() => {
      this.logout();
      this.router.navigate(["/"]);
    })
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  onSelectFile(event: any){
    const file: any = event.target.files[0];
    this.file = file;
  }
  public delete(){
    this.file = null;
  }
}
