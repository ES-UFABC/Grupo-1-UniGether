import { DadosPessoais } from './../../dados-pessoais/dados-pessoais.model';
import { CadastroService } from './../../cadastro/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatchService } from './its-match.service';

@Component({
  selector: 'app-its-match',
  templateUrl: './its-match.component.html',
  styleUrls: ['./its-match.component.css']
})
export class ItsMatchComponent implements OnInit {

  currentUser: any;
  decoded: any;
  user_id1: number;
  user_id2: Number[];
  user1 = new DadosPessoais();
  user2 = new DadosPessoais();

  constructor(private cadastroService: CadastroService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.cadastroService.readById(this.decoded.id).subscribe(res => {
        this.user1 = res
      });
      this.matchService.getMatch(this.decoded.id).subscribe((res: Number[]) => {
        this.user_id2 = res;
      })
      this.cadastroService.readById(this.decoded.id).subscribe(res => {
        this.user2 = res;
      });
    }

  }

  newConversation() {

  }

}
