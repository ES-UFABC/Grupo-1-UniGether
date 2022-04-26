import { ProfileService } from './../profile/profile.service';
import { Group } from './group.model';
import { WebchatService } from './webchat.service';
import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CadastroService } from '../cadastro/cadastro.service';
import { ChatService } from '../chat/chat.service';
import { Profile } from '../profile/profile.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webchat',
  templateUrl: './webchat.component.html',
  styleUrls: ['./webchat.component.css']
})
export class WebchatComponent implements OnInit {

  base_url: string = "http://localhost:8080/avatars/file"
  cadastro = new Profile();
  @Input('groups') groups: Group[];
  isLoggedIn = false;
  hasJoined = false;
  currentUser: any;
  idCurrentUser: string;
  decoded: any;
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];
  image: any;

  constructor(private _chatService: ChatService, private tokenStorage: TokenStorageService, private cadastroService: CadastroService, private webchatService: WebchatService, private profileService: ProfileService, private router: Router) {
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
      this.idCurrentUser = this.decoded.id;
      this.cadastroService.readById(this.decoded.id).subscribe(cadastro => {
        this.cadastro = cadastro;
        this.user = cadastro.name;
      });
      this.webchatService.readById(this.decoded.id).subscribe((res: Group[]) => {
        this.groups = res
        console.log(this.groups)
      })
      this.profileService.getFiles().subscribe(file => {
        this.image = this.createImage(file);
      });
    }
  }

  roomClicked(name: String) {
    if (this.hasJoined) {
      this.leave();
    }
    this.room = name;
    this.join();
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
    this.messageArray = [];
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    this.messageText = '';
  }

  deleteGroup(group_id: number): void {
    this.leave();
    this.webchatService.delete(this.cadastro.id, group_id).subscribe(() => {
      this.webchatService.showMessage("Você saiu do grupo");
      this.reloadPage();
    })
  }

  reloadPage(): void {
    window.location.reload();
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
