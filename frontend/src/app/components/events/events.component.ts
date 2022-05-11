import { DialogEventComponent } from './../templates/dialog-event/dialog-event.component';
import { Group } from './../webchat/group.model';
import { WebchatService } from './../webchat/webchat.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogService } from '../templates/dialog/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Events } from './events.model';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  hasClicked = false
  event = new Events()
  listEvents : Events []
  typeEvent:string
  privateEvent: boolean
  listTypeEvent = [{nome:"Online", value:"Online"},{nome:"Presencial",value:"Online"},{nome:"Hibrido",value:"Online"}]
  listPrivateEvent = [{nome:"Sim", value:false},{nome:"Não",value:false}]
  

  

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private tokenStorage: TokenStorageService,
    private snackBar: MatSnackBar,
    private webchatService: WebchatService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.getAllEvents()
  }

  openDialog() {
    this.dialog.open(DialogEventComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        // this.getAllGroups(this.userId);
      }
    })
  }

  getAllEvents(){
    this.eventsService.getAllEvents().subscribe((resp: Events[]) => {
      this.listEvents = resp
    })
  }
  getUserEvents(){

  }

  newEvent(){
    this.event.type = this.typeEvent
    this.event.closed = this.privateEvent
    this.event.start_date = new Date
    this.event.end_date = new Date

    this.eventsService.postEvent(this.event).subscribe((resp: Events)=>{
      this.event = resp
      alert('Evento criado com sucesso!')
      this.event = new Events()
      this.typeEvent = null
      this.privateEvent = null
      this.getAllEvents()
    })
  }

}
