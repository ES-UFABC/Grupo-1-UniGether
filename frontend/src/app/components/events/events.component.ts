import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  typesList = ['Online','Presencial','Hibrido']
  file: any
  fileForUpload: any
  constructor() { }

  ngOnInit(): void {
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
    // if (this.file) {
    //   this.dadosPessoaisService.uploadfile(this.fileForUpload).subscribe(resp => {
    //     this.dadosPessoaisService.showMessage("Upload da foto foi realizado")
    //   })
    // } else {
    //   this.dadosPessoaisService.showMessage("Selecione primeiro o arquivo")
    // }
  }

}
