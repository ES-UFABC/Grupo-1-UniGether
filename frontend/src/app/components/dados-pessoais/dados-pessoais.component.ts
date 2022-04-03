import { DadosPessoaisService } from './dados-pessoais.service';
import { DadosPessoais } from './dados-pessoais.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from './../cadastro/cadastro.service';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BottomDeleteComponent } from '../templates/bottom-delete/bottom-delete.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})

export class DadosPessoaisComponent implements OnInit {

  @ViewChild('fileUpload',{static: false})fileUpload: ElementRef;
  isLoggedIn = false;
  currentUser: any;
  decoded: any;
  cadastro = new DadosPessoais();

  file: any
  fileForUpload: any

  constructor(private tokenStorage: TokenStorageService, private cadastroService: CadastroService, private dadosPessoaisService: DadosPessoaisService,private router: Router, private route: ActivatedRoute,private _bottomSheet: MatBottomSheet){ }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
    }
  }

  updateUser(): void {
    this.cadastroService.update(this.cadastro).subscribe(() => {
      this.logout();
      this.router.navigate(["/login"]);
      this.cadastroService.showMessage('Usuário alterado com sucesso');
    })
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{
        this.file = event.target.result;
        this.fileForUpload  = e.target.files[0];
      }
    }
  }

  upload() {
    if (this.file) {
      this.dadosPessoaisService.uploadfile(this.fileForUpload).subscribe(resp => {
        this.dadosPessoaisService.showMessage("Upload da foto foi realizado")
      })
    } else {
      this.dadosPessoaisService.showMessage("Selecione primeiro o arquivo")
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomDeleteComponent);
  }

  public delete(){
    this.file = null;
  }
}

