import { DialogService } from './../dialog/dialog.service';
import { GroupListService } from './../../group-list/group-list.service';
import { IItsMatch } from './itsmatch.model';
import { DadosPessoais } from './../../dados-pessoais/dados-pessoais.model';
import { CadastroService } from './../../cadastro/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatchService } from './its-match.service';
import { Group } from './../dialog/dialog.model'

@Component({
  selector: 'app-its-match',
  templateUrl: './its-match.component.html',
  styleUrls: ['./its-match.component.css']
})
export class ItsMatchComponent implements OnInit {

  currentUser: any;
  decoded: any;
  user_id1: number;
  user2: IItsMatch[];
  user1 = new DadosPessoais();
  group = new Group();

  constructor(private cadastroService: CadastroService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute, private matchService: MatchService, private dialogService: DialogService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.cadastroService.readById(this.decoded.id).subscribe(res => {
        this.user1 = res
      });
      this.matchService.getMatch(this.decoded.id).subscribe((res: IItsMatch[]) => {
        this.user2 = res;
      });
    }
  }

  newConversation(user1, user2) {
    this.group.name = `Match ${user1.name} e ${user2.name}`
    this.group.description = ""
    this.group.closed = true;
    this.dialogService.postGroup(this.group).subscribe(res => {
      this.dialogService.addUserInGroup(user2.id, res.id);
    })
  }

}
