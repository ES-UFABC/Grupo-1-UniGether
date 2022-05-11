import { TokenStorageService } from 'src/app/_services/token-storage.service';
// import { DialogService } from './dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../profile/profile.model';
import jwt_decode from 'jwt-decode';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.css']
})
export class DialogEventComponent implements OnInit {
  isActive = false;
  file: any
  fileForUpload: any
  actionBtn: string = "Salvar"
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogEventComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private tokenStorage: TokenStorageService, private snackBar: MatSnackBar) { }
  eventForm !: FormGroup

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      closed: [false, Validators.required]
    })
    if (this.editData) {
      this.actionBtn = "Update"
      this.eventForm.controls['name'].setValue(this.editData.name);
      this.eventForm.controls['description'].setValue(this.editData.description);
      this.eventForm.controls['closed'].setValue(this.editData.closed);
    }
  }

  addEvent() {
    // if (!this.editData) {
    //   if (this.eventForm.valid) {
    //     this.dialogService.postGroup(this.eventForm.value)
    //       .subscribe({
    //         next: (res) => {
    //           this.showMessage("Grupo adicionado com sucesso")
    //           this.eventForm.reset();
    //           this.dialogRef.close('save');
    //         },
    //         error: () => {
    //           this.showMessage("Erro no processo de adicionar grupo")
    //         }
    //       })
    //   }
    // } else {
    //   this.updateGroup()
    // }
  }

  onSelectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = event.target.result;
        this.fileForUpload = e.target.files[0];
      }
    }
  }

  upload() {
    // if (this.file) {
    //   this.dadosPessoaisService.uploadfile(this.fileForUpload).subscribe(resp => {
    //     this.dadosPessoaisService.showMessage("Upload da foto foi realizado")
    //   })
    // } else {
    //   this.dadosPessoaisService.showMessage("Selecione primeiro o arquivo")
    // }
  }

}
