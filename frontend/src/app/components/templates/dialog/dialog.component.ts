import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DialogService } from './dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../profile/profile.model';
import jwt_decode from 'jwt-decode';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private tokenStorage: TokenStorageService, private snackBar: MatSnackBar) { }
  groupForm !: FormGroup

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      closed: [false, Validators.required]
    })
    if (this.editData) {
      this.actionBtn = "Update"
      this.groupForm.controls['name'].setValue(this.editData.name);
      this.groupForm.controls['description'].setValue(this.editData.description);
      this.groupForm.controls['closed'].setValue(this.editData.closed);
    }
  }

  addGroup() {
    if (!this.editData) {
      if (this.groupForm.valid) {
        this.dialogService.postGroup(this.groupForm.value)
          .subscribe({
            next: (res) => {
              this.showMessage("Grupo adicionado com sucesso")
              this.groupForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              this.showMessage("Erro no processo de adicionar grupo")
            }
          })
      }
    } else {
      this.updateGroup()
    }
  }

  updateGroup() {
    this.dialogService.putGroup(this.groupForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.showMessage("Grupo atualizado com sucesso!");
        this.groupForm.reset();
        this.dialogRef.close('update');
        this.reloadPage();
      },
      error: () => {
        this.showMessage("Erro enquanto atualizando o cadastro de grupo");
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
