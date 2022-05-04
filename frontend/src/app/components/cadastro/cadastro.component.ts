import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import { Cadastro } from './cadastro.model';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private cadastroService: CadastroService, private router: Router) { }

  cadastro: Cadastro = {
    name: '',
    university: '',
    course: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  ngOnInit(): void {


  }

  createCadastro(): void {
    this.cadastroService.create(this.cadastro).subscribe(() => {
      this.router.navigate(['/login'])
      this.cadastroService.showMessage('Cadastro do usuário concluído com sucesso')
    })
  }

}
