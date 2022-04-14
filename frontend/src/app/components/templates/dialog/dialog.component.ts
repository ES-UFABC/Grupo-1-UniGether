import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DialogService } from './dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../profile/profile.model';
import jwt_decode from 'jwt-decode';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  cadastro = new Profile();
  isLoggedIn = false;
  currentUser: any;
  decoded: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private tokenStorage: TokenStorageService, private dialogRef: MatDialogRef<DialogComponent>) { }
  groupForm !: FormGroup

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      closed: [false, Validators.required]
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.userId = this.decoded.id;
    }
  }

  addGroup() {
    if (this.groupForm.valid) {
      this.dialogService.postGroup(this.groupForm.value, this.userId)
        .subscribe({
          next: (res) => {
            alert("Grupo adicionado com sucesso")
            this.groupForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Erro no processo de adicionar grupo")
          }
        })
    }
  }
}
