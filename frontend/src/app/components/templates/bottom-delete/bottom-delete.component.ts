import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CadastroService } from '../../cadastro/cadastro.service';

@Component({
  selector: 'app-bottom-delete',
  templateUrl: './bottom-delete.component.html',
  styleUrls: ['./bottom-delete.component.css']
})
export class BottomDeleteComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private cadastroService: CadastroService, private _bottomSheetRef: MatBottomSheetRef<BottomDeleteComponent>, private router: Router) { }

  ngOnInit(): void {
  }


  deleteUser(): void {
    this.cadastroService.delete().subscribe(() => {
      this.logout();
      this.cadastroService.showMessage('Usuário excluído com sucesso');
    })
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(["/"]);
  }

  closeModal(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
