import { DadosPessoaisService } from './dados-pessoais.service';
import { DadosPessoais } from './dados-pessoais.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from './../cadastro/cadastro.service';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor(private tokenStorage: TokenStorageService, private cadastroService: CadastroService, private dadosPessoaisService: DadosPessoaisService,private router: Router, private route: ActivatedRoute){ }

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

  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{
        this.file=event.target.result;
        //const blob = new Blob([new Uint8Array(event.target.result)], {type: (event.target as HTMLInputElement).files[0].type });
      }
    }
  }

  upload() {
    if (this.file) {
      this.dadosPessoaisService.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded");
      })
    } else {
      alert("Please select a file first");
    }
  }

  public delete(){
    this.file = null;
  }
}

