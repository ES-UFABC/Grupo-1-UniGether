import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile/profile.model';
import { ChatService } from './chat.service';
import jwt_decode from 'jwt-decode';
import { CadastroService } from '../cadastro/cadastro.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  cadastro = new Profile();
  isLoggedIn = false;
  hasJoined = false;
  currentUser: any;
  decoded: any;
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];
  constructor(private _chatService: ChatService, private tokenStorage: TokenStorageService, private cadastroService: CadastroService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.cadastroService.readById(this.decoded.id).subscribe(cadastro => {
        this.cadastro = cadastro;
        this.user = cadastro.name;
      });
    }
  }

  join() {
    this._chatService.joinRoom({ user: this.user, room: this.room });
    this._chatService.hasJoin$.next(true);
    this.hasJoined = true;
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user, room: this.room });
    this._chatService.hasJoin$.next(false);
    this.hasJoined = false;
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
  }
}


